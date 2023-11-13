import React, { useEffect, useState } from "react";
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
	Tooltip,
	Image,
	Chip,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import SelectSortBy from "../../uis/Selects/SelectSortBy";
import {
	fetchProductAsync,
	onClear,
	onSearch,
	onSort,
	setBrand,
	setCategory,
	setPagination,
	setSearch,
} from "../../../redux/features/products";
import { axiosInstance } from "../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import SelectProductBrands from "../../uis/Selects/SelectProductBrands";
import SelectProductCategories from "../../uis/Selects/SelectProductCategories";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AdminEditStockModal from "../../layouts/admin/AdminEditStockModal";

const AdminStocksListTable = ({ props }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const products = useSelector((state) => state.products.products);
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
		const selectedSearch = queryParams.get("search");
		const selectedCategory = queryParams.get("category");
		const selectedBrand = queryParams.get("brand");
		const selectedOrderField = queryParams.get("orderField");
		const selectedOrderDirection = queryParams.get("orderDirection");
		const selectedOffset = queryParams.get("offset");
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
		navigate(`/admin/stocks${search && `?search=${search}`}`);
		window.location.reload(false);
	};

	useEffect(() => {
		takeFromQuery();

		window.scrollTo({ top: 0 });

		return () => {
			dispatch(onClear());
			dispatch(setSearch(""));
		};
	}, []);

	useEffect(() => {
		navigate(
			`/admin/stocks?search=${search}&brand=${brand.join(
				""
			)}&category=${category.join(
				""
			)}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
		);

		dispatch(
			fetchProductAsync(
				`?&search=${search}&brand=${brand.join(
					""
				)}&category=${category.join(
					""
				)}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
			)
		);
	}, [orderField, orderDirection, search, page, category, brand]);

	const columns = [
		{ name: "PRODUCT INFO", uid: "product_info" },
		{ name: "CATEGORY", uid: "category" },
		{ name: "BRAND", uid: "brand" },
		{ name: "PRICE", uid: "price" },
		{ name: "STOCKS", uid: "stocks" },
		{ name: "ACTIONS", uid: "actions" },
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
						<div className="product-image aspect-square w-12 h-12 md:w-20 md:h-20 rounded-lg object-contain">
							<Image
								src={`${
									process.env.REACT_APP_IMAGE_API
								}${product?.product_images[0]?.image.substring(
									7
								)}`}
								alt=""
								className="product-image aspect-square w-full h-full object-contain bg-white"
							/>
						</div>
						<p className="font-medium text-base line-clamp-1">
							{product?.product_name}
						</p>
					</div>
				);
			case "category":
				return <Chip>{product?.category?.category_type}</Chip>;
			case "brand":
				return <Chip>{product?.brand?.brand_name}</Chip>;
			case "price":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{productPrice}
						</p>
					</div>
				);
			case "stocks":
				return (
					<p className="text-base line-clamp-1">
						{/* {product?.stocks} */}
					</p>
				);
			case "actions":
				return (
					<div className="relative flex justify-start items-center gap-2">
						{/* <Tooltip content="Edit product">
							<Button
								variant="light"
								className="text-default-400 cursor-pointer active:opacity-50"
								startContent={<BiEdit size={24} />}
							>
								Edit
							</Button>
						</Tooltip> */}
						<AdminEditStockModal />
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

	useEffect(() => {
		console.log(">>>>>", products);
	}, [products]);

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-center">
					<form className="w-[50%]" onSubmit={handleSubmitSearch}>
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
							className="border-neutral-200 dark:border-neutral-700"
							onClick={() => clear()}
						>{`Clear Filter(s)`}</Button>
						<div className="select-brands">
							<SelectProductBrands />
						</div>
						<div className="select-categories">
							<SelectProductCategories />
						</div>
						<div className="sort-by flex items-center">
							<div className="w-full mr-2 font-medium">
								Sort by:
							</div>
							<SelectSortBy admin={true} />
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Showing {1 + offset}-{offset + products?.length} out of{" "}
						{count} products.
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
				<TableBody emptyContent={"No products found"} items={products}>
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

export default AdminStocksListTable;
