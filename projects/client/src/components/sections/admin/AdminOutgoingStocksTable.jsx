import {
	Button,
	Chip,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import SelectProductBrands from "../../uis/Selects/SelectProductBrands";
import SelectProductCategories from "../../uis/Selects/SelectProductCategories";
import SelectSortBy from "../../uis/Selects/SelectSortBy";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
	fetchStockAsync,
	onClear,
	onSearch,
	onSort,
	setBrand,
	setCategory,
	setPagination,
	setProductsForStocks,
	setSearch,
	setTotalPage,
	setWarehouse,
} from "../../../redux/features/products";

const AdminOutgoingStocksTable = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const warehouse = useSelector((state) => state.products.warehouse);
	const products = useSelector((state) => state.products.productsForStocks);
	const count = useSelector((state) => state.products.count);
	const totalPage = useSelector((state) => state.products.totalPage);
	const orderField = useSelector((state) => state.products.orderField);
	const orderDirection = useSelector(
		(state) => state.products.orderDirection
	);
	const search = useSelector((state) => state.products.search);
	const page = useSelector((state) => state.products.page);
	const offset = useSelector((state) => state.products.offset);
	const category = useSelector((state) => state.products.category);
	const brand = useSelector((state) => state.products.brand);

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedWarehouse = queryParams.get("warehouse");
		const selectedSearch = queryParams.get("search");
		const selectedCategory = queryParams.get("category");
		const selectedBrand = queryParams.get("brand");
		const selectedOrderField = queryParams.get("orderField");
		const selectedOrderDirection = queryParams.get("orderDirection");
		const selectedOffset = queryParams.get("offset");
		if (selectedWarehouse) {
			dispatch(setWarehouse(selectedWarehouse));
		}
		if (selectedSearch) {
			dispatch(onSearch(selectedSearch));
		}
		if (selectedCategory) {
			dispatch(setCategory(selectedCategory));
		}
		if (selectedBrand) {
			dispatch(setBrand(selectedBrand));
		}
		if (selectedOrderDirection && selectedOrderField) {
			dispatch(onSort(selectedOrderField, selectedOrderDirection));
		}
		if (selectedOffset) {
			const selectedPage = Number(selectedOffset) / 12 + 1;
			dispatch(setPagination(selectedPage, Number(selectedOffset)));
		}
	};

	const clear = async () => {
		await dispatch(onClear());
		navigate(
			`/admin/stocks?warehouse=${warehouse}${
				search && `&search=${search}`
			}`
		);
		window.location.reload(false);
	};

	useEffect(() => {
		takeFromQuery();

		window.scrollTo({ top: 0 });

		return () => {
			dispatch(onClear());
			dispatch(setSearch(""));
			dispatch(setProductsForStocks([]));
			dispatch(setTotalPage(1));
			dispatch(setWarehouse(null));
		};
	}, []);

	useEffect(() => {
		if (warehouse) {
			navigate(
				`/admin/stocks?warehouse=${warehouse}&search=${search}&brand=${brand.join(
					","
				)}&category=${category.join(
					","
				)}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
			);

			dispatch(
				fetchStockAsync(
					`?warehouse=${warehouse}&search=${search}&brand=${brand.join(
						","
					)}&category=${category.join(
						","
					)}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
				)
			);
		}
	}, [orderField, orderDirection, search, page, category, brand, warehouse]);

	const columns = [
		{ name: "PRODUCT INFO", uid: "product_info" },
		{ name: "FROM", uid: "from" },
		{ name: "QUANTITY", uid: "quantity" },
		{ name: "STATUS", uid: "status" },
	];

	const renderCell = React.useCallback((product, columnKey) => {
		const productPrice = product?.product_price.toLocaleString("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});
		const encodedProductName = encodeURIComponent(product?.product_name);

		switch (columnKey) {
			case "product_info":
				return (
					<div className="flex items-center gap-4 w-[240px] md:w-full">
						<p className="font-medium text-base line-clamp-1">
							{product?.product_name}
						</p>
					</div>
				);
			case "from":
				return <Chip>{product?.category?.category_type}</Chip>;
			case "quantity":
				return <Chip>{product?.brand?.brand_name}</Chip>;
			case "status":
				return (
					<p className="text-base line-clamp-1">{product?.stock}</p>
				);
			default:
		}
	}, []);

	const bottomContent = React.useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<Pagination
					size="md"
					showControls
					total={totalPage ? totalPage : 1}
					page={page ? page : 0}
					color="secondary"
					variant="flat"
					className="z-0"
					onChange={(e) => {
						dispatch(setPagination(e, (e - 1) * 12));
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				/>
			</div>
		);
	}, [totalPage, page]);

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-center">
					<div className="flex gap-3 w-full">
						<div className="select-brands">
							<SelectProductBrands />
						</div>
						<div className="select-categories">
							<SelectProductCategories />
						</div>
						<Button
							variant="bordered"
							className="border-neutral-200 dark:border-neutral-700"
							onClick={() => clear()}
						>{`Clear Filter(s)`}</Button>
						<div className="sort-by ml-auto flex items-center">
							<div className="w-full mr-2 font-medium">
								Sort by:
							</div>
							<SelectSortBy admin={false} />
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Showing
						{products?.length
							? ` ${1 + offset}-${offset + products?.length} `
							: ` 0 `}
						out of {count} products.
					</span>
				</div>
			</div>
			<Table
				aria-label="Example table with custom cells, pagination and sorting"
				isHeaderSticky
				bottomContent={bottomContent}
				bottomContentPlacement="outside"
				fullWidth
				topContentPlacement="outside"
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							className={
								column.uid === "product_info" &&
								"w-full md:w-[40%]"
							}
							allowsSorting={column.sortable}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					emptyContent={"Please select warehouse"}
					items={products}
				>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>
									{renderCell(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
};

export default AdminOutgoingStocksTable;
