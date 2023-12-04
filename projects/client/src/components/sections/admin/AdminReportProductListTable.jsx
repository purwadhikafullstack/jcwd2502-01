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
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import SelectSortByP from "../../uis/Selects/SelectSortByP";
import {
	setBrand,
	setCategory,
	setWarehouse,
} from "../../../redux/features/products";
import { axiosInstance } from "../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import SelectProductBrands from "../../uis/Selects/SelectProductBrands";
import SelectProductCategories from "../../uis/Selects/SelectProductCategories";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import MyMonthPicker from "../../uis/MyMonthPicker/MyMonthPicker";
import {
	getTransactionByProduct,
	onClearProduct,
	onSearchProduct,
	onSortP,
	setCountProduct,
	setMonth,
	setPaginationProduct,
	setSearchProduct,
	setTotalPageProduct,
	setYear,
} from "../../../redux/features/report";

const AdminReportProductListTable = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [oneTime, setOneTime] = useState(false);

	const transactionByProduct = useSelector(
		(state) => state.report.transactionByProduct
	);
	const year = useSelector((state) => state.report.year);
	const month = useSelector((state) => state.report.month);
	const warehouse = useSelector((state) => state.products.warehouse);
	const role = useSelector((state) => state.user.role);
	const count = useSelector((state) => state.report.countProduct);
	const totalPage = useSelector((state) => state.report.totalPageProduct);
	const orderField = useSelector((state) => state.report.orderFieldProduct);
	const orderDirection = useSelector(
		(state) => state.report.orderDirectionProduct
	);
	const search = useSelector((state) => state.report.searchProduct);
	const page = useSelector((state) => state.report.pageProduct);
	const offset = useSelector((state) => state.report.offsetProduct);
	const category = useSelector((state) => state.products.category);
	const brand = useSelector((state) => state.products.brand);

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedWarehouse = queryParams.get("warehouse");
		const selectedSearch = queryParams.get("searchProduct");
		const selectedCategory = queryParams.get("categoryProduct");
		const selectedBrand = queryParams.get("brandProduct");
		const selectedOrderField = queryParams.get("orderFieldProduct");
		const selectedOrderDirection = queryParams.get("orderDirectionProduct");
		const selectedOffset = queryParams.get("offsetProduct");
		const selectedMonth = queryParams.get("month");
		const selectedYear = queryParams.get("year");
		if (selectedWarehouse) {
			dispatch(setWarehouse(selectedWarehouse));
		}
		if (selectedSearch) {
			dispatch(onSearchProduct(selectedSearch));
		}
		if (selectedCategory) {
			dispatch(setCategory(selectedCategory));
		}
		if (selectedBrand) {
			dispatch(setBrand(selectedBrand));
		}
		if (selectedOrderDirection && selectedOrderField) {
			dispatch(onSortP(selectedOrderField, selectedOrderDirection));
		}
		if (selectedOffset) {
			const selectedPage = Number(selectedOffset) / 12 + 1;
			dispatch(
				setPaginationProduct(selectedPage, Number(selectedOffset))
			);
		}
		if (selectedMonth && selectedYear) {
			dispatch(setMonth(selectedMonth));
			dispatch(setYear(selectedYear));
		}
	};

	const formik = useFormik({
		initialValues: { searchQuery3: "" },
		onSubmit: (values) => {
			// Handle the search query submission here
			dispatch(onSearchProduct(values.searchQuery3));
			navigate(
				`/admin/reports?warehouse=${
					warehouse !== null ? `${warehouse}` : ""
				}&searchProduct=${
					search !== null ? `${search}` : ""
				}&brandProduct=${brand.join(
					","
				)}&categoryProduct=${category.join(",")}&orderFieldProduct=${
					orderField !== null ? `${orderField}` : ""
				}&orderDirectionProduct=${
					orderDirection !== null ? `${orderDirection}` : ""
				}&offsetProduct=${offset !== null ? `${offset}` : ""}&month=${
					month !== null ? `${month}` : ""
				}&year=${year !== null ? `${year}` : ""}`
			);
		},
	});

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		formik.handleSubmit();
		window.scrollTo({ top: 0 });
	};

	useEffect(() => {
		formik.setFieldValue("searchQuery3", search);
	}, [search]);

	const clear = async () => {
		dispatch(onClearProduct());
		dispatch(setBrand([]));
		dispatch(setCategory([]));
		if (role === "super") {
			dispatch(setWarehouse(null));
		}
		navigate(
			`/admin/reports?warehouse=${
				warehouse !== null ? `${warehouse}` : ""
			}&searchProduct=${
				search !== null ? `${search}` : ""
			}&brandProduct=${brand.join(",")}&categoryProduct=${category.join(
				","
			)}&orderFieldProduct=${
				orderField !== null ? `${orderField}` : ""
			}&orderDirectionProduct=${
				orderDirection !== null ? `${orderDirection}` : ""
			}&offsetProduct=${offset !== null ? `${offset}` : ""}&month=${
				month !== null ? `${month}` : ""
			}&year=${year !== null ? `${year}` : ""}`
		);
		// window.location.reload(false);
	};

	useEffect(() => {
		takeFromQuery();

		window.scrollTo({ top: 0 });
		setOneTime(true);
		// return () => {
		// 	dispatch(onClearProduct());
		// 	dispatch(setSearchProduct(""));
		// 	// dispatch(setProductsForStocks([]));
		// 	dispatch(setTotalPageProduct(1));
		// 	// dispatch(setWarehouse(null));
		// 	dispatch(setCountProduct(0));
		// };
	}, []);

	useEffect(() => {
		if (oneTime) {
			navigate(
				`/admin/reports?warehouse=${
					warehouse !== null ? `${warehouse}` : ""
				}&searchProduct=${
					search !== null ? `${search}` : ""
				}&brandProduct=${brand.join(
					","
				)}&categoryProduct=${category.join(",")}&orderFieldProduct=${
					orderField !== null ? `${orderField}` : ""
				}&orderDirectionProduct=${
					orderDirection !== null ? `${orderDirection}` : ""
				}&offsetProduct=${offset !== null ? `${offset}` : ""}&month=${
					month !== null ? `${month}` : ""
				}&year=${year !== null ? `${year}` : ""}`
			);

			dispatch(
				getTransactionByProduct(
					`?warehouse=${
						warehouse !== null ? `${warehouse}` : ""
					}&search=${
						search !== null ? `${search}` : ""
					}&brand=${brand.join(",")}&category=${category.join(
						","
					)}&orderField=${
						orderField !== null ? `${orderField}` : ""
					}&orderDirection=${
						orderDirection !== null ? `${orderDirection}` : ""
					}&offset=${offset !== null ? `${offset}` : ""}&month=${
						month !== null ? `${month}` : ""
					}&year=${year !== null ? `${year}` : ""}`
				)
			);
		}
	}, [
		orderField,
		orderDirection,
		search,
		page,
		category,
		brand,
		warehouse,
		month,
		year,
		oneTime,
	]);

	const columns = [
		{ name: "DATE", uid: "date" },
		{ name: "INVOICE", uid: "invoice" },
		{ name: "PRODUCT NAME", uid: "product_name" },
		{ name: "CATEGORY", uid: "category" },
		{ name: "BRAND", uid: "brand" },
		{ name: "QUANTITY", uid: "quantity" },
		{ name: "FINAL PRICE", uid: "final_price" },
		{ name: "WAREHOUSE", uid: "warehouse" },
	];

	const renderCell = React.useCallback((product, columnKey) => {
		const formattedDate = new Date(product.createdAt).toLocaleDateString(
			"en-GB",
			{
				day: "numeric",
				month: "short",
				year: "numeric",
			}
		);

		const productPrice = (
			product.checked_out_price * product.quantity
		).toLocaleString("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});
		const encodedProductName = encodeURIComponent(product?.product_name);

		switch (columnKey) {
			case "date":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{formattedDate}
						</p>
					</div>
				);
			case "invoice":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{product.order.invoice}
						</p>
					</div>
				);
			case "product_name":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{product.product.product_name}
						</p>
					</div>
				);
			case "category":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{product.product.category.category_type}
						</p>
					</div>
				);
			case "brand":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{product.product.brand.brand_name}
						</p>
					</div>
				);
			case "quantity":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{product.quantity}
						</p>
					</div>
				);
			case "final_price":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{productPrice}
						</p>
					</div>
				);
			case "warehouse":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{product.order.warehouse.warehouse_name}
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
					total={transactionByProduct ? totalPage : 1}
					page={page ? page : 0}
					color="secondary"
					variant="flat"
					className="z-0"
					onChange={(e) => {
						dispatch(setPaginationProduct(e, (e - 1) * 12));
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
							onClear={() => dispatch(setSearchProduct(""))}
							startContent={<IoSearch opacity={".5"} />}
							variant="bordered"
							fullWidth
							onChange={(e) =>
								formik.setFieldValue(
									"searchQuery3",
									e.target.value
								)
							}
							value={formik.values.searchQuery3}
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
							<SelectSortByP placeholder="Sort" />
						</div>
						{/* <MyMonthPicker /> */}
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Showing
						{transactionByProduct?.length
							? ` ${1 + offset}-${
									offset + transactionByProduct?.length
							  } `
							: ` 0 `}
						out of {count} transaction per product.
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
					items={transactionByProduct}
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

export default AdminReportProductListTable;
