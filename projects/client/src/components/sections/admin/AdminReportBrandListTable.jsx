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
import SelectSortByB from "../../uis/Selects/SelectSortByB";
import {
	setCount,
	setProductsForStocks,
	setWarehouse,
} from "../../../redux/features/products";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SelectWarehouses from "../../uis/Selects/SelectWarehouses";
import MyMonthPicker from "../../uis/MyMonthPicker/MyMonthPicker";
import {
	getTransactionByBrand,
	onSearchBrand,
	onClearBrand,
	setTotalPageBrand,
	setSearchBrand,
	setPaginationBrand,
	setCountBrand,
	onSortB,
	setMonth,
	setYear,
} from "../../../redux/features/report";

const AdminReportBrandListTable = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [oneTime, setOneTime] = useState(true);

	const transactionByBrand = useSelector(
		(state) => state.report.transactionByBrand
	);
	console.log(transactionByBrand);
	const role = useSelector((state) => state.user.role);
	const warehouse = useSelector((state) => state.products.warehouse);
	const count = useSelector((state) => state.report.countBrand);
	const totalPage = useSelector((state) => state.report.totalPageBrand);
	const orderFieldBrand = useSelector(
		(state) => state.report.orderFieldBrand
	);
	const orderDirectionBrand = useSelector(
		(state) => state.report.orderDirectionBrand
	);
	const search = useSelector((state) => state.report.searchBrand);
	const page = useSelector((state) => state.report.pageBrand);
	const offset = useSelector((state) => state.report.offsetBrand);
	const month = useSelector((state) => state.report.month);
	const year = useSelector((state) => state.report.year);

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedWarehouse = queryParams.get("warehouse");
		const selectedSearch = queryParams.get("searchBrand");
		const selectedOrderField = queryParams.get("orderFieldBrand");
		const selectedOrderDirection = queryParams.get("orderDirectionBrand");
		const selectedOffset = queryParams.get("offsetBrand");
		const selectedMonth = queryParams.get("month");
		const selectedYear = queryParams.get("year");
		if (selectedWarehouse) {
			dispatch(setWarehouse(selectedWarehouse));
		}
		if (selectedSearch) {
			dispatch(onSearchBrand(selectedSearch));
		}
		if (selectedOrderDirection && selectedOrderField) {
			dispatch(onSortB(selectedOrderField, selectedOrderDirection));
		}
		if (selectedOffset) {
			const selectedPage = Number(selectedOffset) / 12 + 1;
			dispatch(setPaginationBrand(selectedPage, Number(selectedOffset)));
		}
		if (selectedMonth && selectedYear) {
			dispatch(setMonth(selectedMonth));
			dispatch(setYear(selectedYear));
		}
	};

	const formik = useFormik({
		initialValues: { searchQuery1: "" },
		onSubmit: (values) => {
			// Handle the search query submission here
			dispatch(onSearchBrand(values.searchQuery1));
			navigate(
				`/admin/reports?warehouse=${
					warehouse !== null ? `${warehouse}` : ""
				}&searchBrand=${
					search !== null ? `${search}` : ""
				}&orderFieldBrand=${
					orderFieldBrand !== null ? `${orderFieldBrand}` : ""
				}&orderDirectionBrand=${
					orderDirectionBrand !== null ? `${orderDirectionBrand}` : ""
				}&offsetBrand=${offset}&month=${
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
		formik.setFieldValue("searchQuery1", search);
	}, [search]);

	const clear = async () => {
		await dispatch(onClearBrand());
		if (role === "super") {
			dispatch(setWarehouse(null));
			// window.location.reload();
			return navigate(
				`/admin/reports?warehouse=${
					warehouse !== null ? `${warehouse}` : ""
				}&searchBrand=${
					search !== null ? `${search}` : ""
				}&orderFieldBrand=${
					orderFieldBrand !== null ? `${orderFieldBrand}` : ""
				}&orderDirectionBrand=${
					orderDirectionBrand !== null ? `${orderDirectionBrand}` : ""
				}&offsetBrand=${offset}&month=${
					month !== null ? `${month}` : ""
				}&year=${year !== null ? `${year}` : ""}`
			);
			// return takeFromQuery();
		}
		navigate(
			`/admin/reports?warehouse=${
				warehouse !== null ? `${warehouse}` : ""
			}&search=${search !== null ? `${search}` : ""}&orderField=${
				orderFieldBrand !== null ? `${orderFieldBrand}` : ""
			}&orderDirection=${
				orderDirectionBrand !== null ? `${orderDirectionBrand}` : ""
			}&offset=${offset}&month=${month !== null ? `${month}` : ""}&year=${
				year !== null ? `${year}` : ""
			}`
		);
		// return takeFromQuery();
		// window.location.reload();
	};
	// console.log(role);
	useEffect(() => {
		takeFromQuery();

		window.scrollTo({ top: 0 });

		// return () => {
		// 	dispatch(onClearBrand());
		// 	dispatch(setSearchBrand(""));
		// 	// dispatch(setProductsForStocks([]));
		// 	dispatch(setTotalPageBrand(1));
		// 	// dispatch(setWarehouse(null));
		// 	dispatch(setCountBrand(0));
		// };
	}, []);
	console.log(warehouse);
	useEffect(() => {
		if (oneTime) {
			console.log(
				`/admin/reports?warehouse=${warehouse}&search=${search}&orderField=${orderFieldBrand}&orderDirection=${orderDirectionBrand}&offset=${offset}`
			);
			navigate(
				`/admin/reports?warehouse=${
					warehouse !== null ? `${warehouse}` : ""
				}&searchBrand=${
					search !== null ? `${search}` : ""
				}&orderFieldBrand=${
					orderFieldBrand !== null ? `${orderFieldBrand}` : ""
				}&orderDirectionBrand=${
					orderDirectionBrand !== null ? `${orderDirectionBrand}` : ""
				}&offsetBrand=${offset}&month=${
					month !== null ? `${month}` : ""
				}&year=${year !== null ? `${year}` : ""}`
			);
			dispatch(
				getTransactionByBrand(
					`?warehouse=${
						warehouse !== null ? `${warehouse}` : ""
					}&search=${search !== null ? `${search}` : ""}&orderField=${
						orderFieldBrand !== null ? `${orderFieldBrand}` : ""
					}&orderDirection=${
						orderDirectionBrand !== null
							? `${orderDirectionBrand}`
							: ""
					}&offset=${offset}&month=${
						month !== null ? `${month}` : ""
					}&year=${year !== null ? `${year}` : ""}`
				)
			);
		}
		console.log(
			orderFieldBrand,
			orderDirectionBrand,
			search,
			page,
			warehouse
		);
		// }
	}, [
		orderFieldBrand,
		orderDirectionBrand,
		search,
		page,
		warehouse,
		month,
		year,
		oneTime,
	]);

	const columns = [
		// { name: "NO", uid: "number" },
		{ name: "BRAND NAME", uid: "brand_name" },
		{ name: "TOTAL", uid: "total" },
	];
	// useEffect(() => {
	// 	dispatch(getTransactionByBrand());
	// }, []);

	useEffect(() => {
		console.log(transactionByBrand);
	}, [transactionByBrand]);

	const renderCell = React.useCallback((TBBrand, columnKey, index) => {
		switch (columnKey) {
			// case "number":
			// 	// const nextTAbleIndex = rowIndex + 1;
			// 	console.log(index);
			// 	return (
			// 		<div className="flex items-center gap-4 w-full">
			// 			<p className="font-bold text-base w-full">{index}</p>
			// 		</div>
			// 	);
			case "brand_name":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{`${TBBrand.brand_name}`}
						</p>
					</div>
				);
			case "total":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{`${TBBrand.total_items}`}
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
						dispatch(setPaginationBrand(e, (e - 1) * 12));
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
							onClear={() => dispatch(setSearchBrand(""))}
							startContent={<IoSearch opacity={".5"} />}
							variant="bordered"
							fullWidth
							onChange={(e) =>
								formik.setFieldValue(
									"searchQuery1",
									e.target.value
								)
							}
							value={formik.values.searchQuery1}
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
							<SelectSortByB placeholder="Sort" />
						</div>
						<MyMonthPicker />
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Showing
						{transactionByBrand?.length
							? ` ${1 + offset}-${
									offset + transactionByBrand?.length
							  } `
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
					items={transactionByBrand}
				>
					{(item) => {
						return (
							<TableRow key={item.id}>
								{(columnKey) => (
									<TableCell>
										{renderCell(item, columnKey)}
									</TableCell>
								)}
							</TableRow>
						);
					}}
				</TableBody>
			</Table>
		</>
	);
};

export default AdminReportBrandListTable;
