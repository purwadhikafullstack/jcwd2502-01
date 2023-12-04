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
	fetchStockHistoryAsync,
	onClear,
	onSearch,
	onSort,
	setBrand,
	setCategory,
	setPagination,
	setSearch,
} from "../../../redux/features/stocksHistory";
import { setWarehouse } from "../../../redux/features/products";
import { axiosInstance } from "../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import SelectProductBrands from "../../uis/Selects/SelectProductBrands";
import SelectProductCategoriesHistory from "../../uis/Selects/SelectProductCategoriesHistory";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AdminEditStockModal from "../../layouts/admin/AdminEditStockModal";
import SelectProductBrandsHistory from "../../uis/Selects/SelectProductBrandsHistory";
import SelectSortByHistory from "../../uis/Selects/SelectSortByHistory";

const AdminStockLogTable = () => {
	const [oneTime, setOneTime] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const role = useSelector((state) => state.user.role);
	const warehouse = useSelector((state) => state.products.warehouse);
	const history = useSelector((state) => state.history.stockHistory);
	const count = useSelector((state) => state.history.count);
	const totalPage = useSelector((state) => state.history.totalPage);
	const orderField = useSelector((state) => state.history.orderField);
	const orderDirection = useSelector((state) => state.history.orderDirection);
	const search = useSelector((state) => state.history.search);
	const page = useSelector((state) => state.history.page);
	const offset = useSelector((state) => state.history.offset);
	const category = useSelector((state) => state.history.category);
	const brand = useSelector((state) => state.history.brand);
	const month = useSelector((state) => state.history.month);
	const year = useSelector((state) => state.history.year);

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedWarehouse = queryParams.get("warehouse");
		const selectedSearch = queryParams.get("searchHistory");
		const selectedCategory = queryParams.get("categoryHistory");
		const selectedBrand = queryParams.get("brandHistory");
		const selectedOrderField = queryParams.get("orderFieldHistory");
		const selectedOrderDirection = queryParams.get("orderDirectionHistory");
		const selectedOffset = queryParams.get("offsetHistory");
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
			navigate(
				`/admin/stock-history?warehouse=${
					warehouse !== null ? warehouse : ""
				}&searchHistory=${
					search !== null ? search : ""
				}&brandHistory=${brand.join(
					","
				)}&categoryHistory=${category.join(",")}&orderFieldHistory=${
					orderField !== null ? orderField : ""
				}&orderDirectionHistory=${
					orderDirection !== null ? orderDirection : ""
				}&offsetHistory=${offset !== null ? offset : ""}&month=${
					month !== null ? month : ""
				}&year=${year !== null ? year : ""}`
			);
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
		dispatch(onClear());
		if (role === "super") {
			dispatch(setWarehouse(null));
		}
		navigate(
			`/admin/stock-history?warehouse=${
				warehouse !== null ? warehouse : ""
			}&searchHistory=${
				search !== null ? search : ""
			}&brandHistory=${brand.join(",")}&categoryHistory=${category.join(
				","
			)}&orderFieldHistory=${
				orderField !== null ? orderField : ""
			}&orderDirectionHistory=${
				orderDirection !== null ? orderDirection : ""
			}&offsetHistory=${offset !== null ? offset : ""}&month=${
				month !== null ? month : ""
			}&year=${year !== null ? year : ""}`
		);
		// window.location.reload(false);
	};

	useEffect(() => {
		takeFromQuery();

		setOneTime(true);

		window.scrollTo({ top: 0 });

		// return () => {
		// 	dispatch(onClear());
		// 	dispatch(setSearch(""));
		// 	dispatch(setStockHistory([]));
		// 	dispatch(setCount(0));
		// };
	}, []);

	useEffect(() => {
		if (oneTime) {
			navigate(
				`/admin/stock-history?warehouse=${
					warehouse !== null ? warehouse : ""
				}&searchHistory=${
					search !== null ? search : ""
				}&brandHistory=${brand.join(
					","
				)}&categoryHistory=${category.join(",")}&orderFieldHistory=${
					orderField !== null ? orderField : ""
				}&orderDirectionHistory=${
					orderDirection !== null ? orderDirection : ""
				}&offsetHistory=${offset !== null ? offset : ""}&month=${
					month !== null ? month : ""
				}&year=${year !== null ? year : ""}`
			);

			dispatch(
				fetchStockHistoryAsync(
					`?warehouse=${warehouse !== null ? warehouse : ""}&search=${
						search !== null ? search : ""
					}&brand=${brand.join(",")}&category=${category.join(
						","
					)}&orderField=${
						orderField !== null ? orderField : ""
					}&orderDirection=${
						orderDirection !== null ? orderDirection : ""
					}&offset=${offset !== null ? offset : ""}&month=${
						month !== null ? month : ""
					}&year=${year !== null ? year : ""}`
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
		{ name: "PRODUCT", uid: "product" },
		{ name: "WAREHOUSE", uid: "warehouse" },
		{ name: "STOCK BEFORE", uid: "stock_before" },
		{ name: "CHANGE", uid: "change" },
		{ name: "FINAL STOCK", uid: "final_stock" },
		{ name: "TYPE", uid: "type" },
	];

	const renderCell = React.useCallback((change, columnKey) => {
		let finalStock = 0;
		let green = true;

		const formattedDate = new Date(change.createdAt).toLocaleDateString(
			"en-GB",
			{
				day: "numeric",
				month: "short",
				year: "numeric",
			}
		);

		if (change?.change === "addition") {
			finalStock =
				Number(change?.stock_before) + Number(change?.quantity_change);
		} else {
			green = false;
			finalStock =
				Number(change?.stock_before) - Number(change?.quantity_change);
		}
		switch (columnKey) {
			case "date":
				return (
					<div className="flex items-center gap-4 w-[240px] md:w-full">
						<p className="font-medium text-base line-clamp-1">
							{formattedDate}
						</p>
					</div>
				);
			case "category":
				return <Chip>{change?.category?.category_type}</Chip>;
			case "brand":
				return <Chip>{change?.brand?.brand_name}</Chip>;
			case "product":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-medium text-base line-clamp-1">
							{change?.stock?.product?.product_name}
						</p>
					</div>
				);
			case "warehouse":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-medium text-base line-clamp-1">
							{change?.stock?.warehouse?.warehouse_name}
						</p>
					</div>
				);
			case "stock_before":
				return (
					<p className="text-base line-clamp-1">
						{change?.stock_before}
					</p>
				);
			case "change":
				return (
					<p
						className={`${
							green ? "text-green-600" : "text-red-600"
						} text-base line-clamp-1`}
					>
						{change?.quantity_change}
					</p>
				);
			case "final_stock":
				return <p className="text-base line-clamp-1">{finalStock}</p>;

			case "type":
				return <Chip>{change?.type}</Chip>;
			case "actions":
				return (
					<div className="relative flex justify-start items-center gap-2">
						{/* <Tooltip content="Edit change">
							<Button
								variant="light"
								className="text-default-400 cursor-pointer active:opacity-50"
								startContent={<BiEdit size={24} />}
							>
								Edit
							</Button>
						</Tooltip> */}
						<AdminEditStockModal id={change?.stocks[0]?.id} />
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
					<div className="flex gap-3 ">
						<Button
							variant="bordered"
							className="border-neutral-200 dark:border-neutral-700"
							onClick={() => clear()}
						>{`Clear Filter(s)`}</Button>
						<div className="select-brands">
							<SelectProductBrandsHistory />
						</div>
						<div className="select-categories">
							<SelectProductCategoriesHistory />
						</div>
						<div className="sort-by flex items-center">
							<div className="w-full mr-2 font-medium">
								Sort by:
							</div>
							<SelectSortByHistory
								admin={false}
								placeholder="Sort"
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Showing
						{history?.length
							? ` ${1 + offset}-${offset + history?.length} `
							: ` 0 `}
						out of {count} changes.
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
					items={history}
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

export default AdminStockLogTable;
