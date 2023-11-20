import React, { useEffect } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	Pagination,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import SelectSortBy from "../../uis/Selects/SelectSortBy";
import {
	fetchStockAsync,
	onClear,
	onSearch,
	onSort,
	setBrand,
	setCategory,
	setCount,
	setPagination,
	setProductsForStocks,
	setSearch,
	setTotalPage,
	setWarehouse,
} from "../../../redux/features/products";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SelectWarehouses from "../../uis/Selects/SelectWarehouses";
import MyMonthPicker from "../../uis/MyMonthPicker/MyMonthPicker";

const AdminReportCategoryListTable = () => {
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

	const formik = useFormik({
		initialValues: { searchQuery: "" },
		onSubmit: (values) => {
			// Handle the search query submission here
			dispatch(onSearch(values.searchQuery));
			navigate("/admin/stocks");
		},
	});

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		formik.handleSubmit();
		window.scrollTo({ top: 0 });
	};

	useEffect(() => {
		formik.setFieldValue("searchQuery", search);
	}, [search]);

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
			dispatch(setCount(0));
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
		{ name: "NO", uid: "number" },
		{ name: "CATEGORY NAME", uid: "category_name" },
		{ name: "TOTAL", uid: "total" },
	];

	const renderCell = React.useCallback((product, columnKey) => {
		switch (columnKey) {
			case "number":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{`order.createdAt`} {/* <<< order.createdAt */}
						</p>
					</div>
				);
			case "category_name":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{`order.order_detail.invoice`}
						</p>
					</div>
				);
			case "total":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{`order.order_detail.product.product_name`}
						</p>
					</div>
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
					<form className="w-[30%]" onSubmit={handleSubmitSearch}>
						<Input
							type="text"
							placeholder="Search for product by name"
							isClearable
							onClear={() => dispatch(setSearch(""))}
							startContent={<IoSearch opacity={".5"} />}
							variant="bordered"
							fullWidth
							onChange={(e) =>
								formik.setFieldValue(
									"searchQuery",
									e.target.value
								)
							}
							value={formik.values.searchQuery}
						/>
					</form>
					<div className="flex gap-3">
						<Button
							variant="bordered"
							className="border-neutral-200 dark:border-neutral-700 w-full"
							onClick={() => clear()}
						>{`Clear Filter(s)`}</Button>
						<SelectWarehouses />
						<div className="sort-by flex items-center">
							<SelectSortBy admin={false} placeholder="Sort" />
						</div>
						<MyMonthPicker />
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
					items={products} // <<<< ganti jadi orders / order_details (?)
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

export default AdminReportCategoryListTable;
