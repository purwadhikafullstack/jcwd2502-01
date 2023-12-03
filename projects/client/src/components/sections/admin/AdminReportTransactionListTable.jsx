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
import SelectSortByT from "../../uis/Selects/SelectSortByT";
import { onSort, setWarehouse } from "../../../redux/features/products";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SelectWarehouses from "../../uis/Selects/SelectWarehouses";
import MyMonthPicker from "../../uis/MyMonthPicker/MyMonthPicker";
import {
	getTransaction,
	setSearchTransaction,
	setPaginationTransaction,
	setCountTransaction,
	setTotalPageTransaction,
	onClearTransaction,
	onSearchTransaction,
	onSortT,
	setMonth,
	setYear,
	setIsChildComponent,
} from "../../../redux/features/report";

const AdminReportTransactionListTable = () => {
	const [oneTime, setOneTime] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const role = useSelector((state) => state.user.role);
	const transaction = useSelector((state) => state.report.transaction);
	const warehouse = useSelector((state) => state.products.warehouse);
	const year = useSelector((state) => state.report.year);
	const month = useSelector((state) => state.report.month);
	const count = useSelector((state) => state.report.countTransaction);
	const totalPage = useSelector((state) => state.report.totalPageTransaction);
	const orderField = useSelector(
		(state) => state.report.orderFieldTransaction
	);
	const orderDirection = useSelector(
		(state) => state.report.orderDirectionTransaction
	);
	const search = useSelector((state) => state.report.searchTransaction);
	const page = useSelector((state) => state.report.pageTransaction);
	const offset = useSelector((state) => state.report.offsetTransaction);

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedWarehouse = queryParams.get("warehouse");
		const selectedSearch = queryParams.get("searchTransaction");
		const selectedOrderField = queryParams.get("orderFieldTransaction");
		const selectedOrderDirection = queryParams.get(
			"orderDirectionTransaction"
		);
		const selectedOffset = queryParams.get("offsetTransaction");
		const selectedMonth = queryParams.get("month");
		const selectedYear = queryParams.get("year");
		if (selectedWarehouse) {
			dispatch(setWarehouse(selectedWarehouse));
		}
		if (selectedSearch) {
			dispatch(onSearchTransaction(selectedSearch));
		}
		if (selectedOrderDirection && selectedOrderField) {
			dispatch(onSortT(selectedOrderField, selectedOrderDirection));
		}
		if (selectedOffset) {
			const selectedPage = Number(selectedOffset) / 12 + 1;
			dispatch(
				setPaginationTransaction(selectedPage, Number(selectedOffset))
			);
		}
		if (selectedMonth && selectedYear) {
			dispatch(setMonth(selectedMonth));
			dispatch(setYear(selectedYear));
		}
	};

	const formik = useFormik({
		initialValues: { searchQuery2: "" },
		onSubmit: (values) => {
			// Handle the search query submission here
			dispatch(onSearchTransaction(values.searchQuery2));
			navigate(
				`/admin/reports?warehouse=${
					warehouse !== null ? `${warehouse}` : ""
				}&searchTransaction=${
					search !== null ? `${search}` : ""
				}&orderFieldTransaction=${orderField}&orderDirectionTransaction=${orderDirection}&offsetTransaction=${offset}&month=${
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
		formik.setFieldValue("searchQuery2", search);
	}, [search]);

	const clear = async () => {
		dispatch(onClearTransaction());
		// dispatch(setIsChildComponent(true));
		if (role === "super") {
			dispatch(setWarehouse(null));
			// window.location.reload();
		}
		navigate(
			`/admin/reports?warehouse=${
				warehouse !== null ? `${warehouse}` : ""
			}&searchTransaction=${
				search !== null ? `${search}` : ""
			}&orderFieldTransaction=${orderField}&orderDirectionTransaction=${orderDirection}&offsetTransaction=${offset}&month=${
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
		// 	dispatch(onClearTransaction());
		// 	dispatch(setSearchTransaction(""));
		// 	// dispatch(setProductsForStocks([]));
		// 	dispatch(setTotalPageTransaction(1));
		// 	dispatch(setWarehouse(null));
		// 	dispatch(setCountTransaction(0));
		// };
	}, []);

	useEffect(() => {

		// console.log(">>>tidak");
		console.log(month);
		console.log(year);
		if (oneTime) {
			navigate(
				`/admin/reports?warehouse=${
					warehouse !== null ? `${warehouse}` : ""
				}&searchTransaction=${
					search !== null ? `${search}` : ""
				}&orderFieldTransaction=${orderField}&orderDirectionTransaction=${orderDirection}&offsetTransaction=${offset}&month=${
					month !== null ? `${month}` : ""
				}&year=${year !== null ? `${year}` : ""}`
			);

			console.log(
				`/admin/reports?${warehouse ? `warehouse=${warehouse}` : ""}${
					search && `&searchTransaction=${search}`
				}&orderFieldTransaction=${orderField}&orderDirectionTransaction=${orderDirection}&offsetTransaction=${offset}&month=${
					month !== null ? `${month}` : ""
				}&year=${year !== null ? `${year}` : ""}`
			);

			dispatch(
				getTransaction(
					`?warehouse=${
						warehouse !== null ? `${warehouse}` : ""
					}&search=${
						search !== null ? `${search}` : ""
					}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}&month=${
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
		warehouse,
		year,
		month,
		oneTime,
	]);

	const columns = [
		{ name: "DATE", uid: "date" },
		{ name: "INVOICE", uid: "invoice" },
		{ name: "RECEIPT NUMBER", uid: "receipt_number" },
		{ name: "TOTAL AMOUNT", uid: "total_amount" },
		// { name: "ACTION", uid: "action" },
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

		const formattedTotalAmount = product.total_amount?.toLocaleString(
			"id-ID",
			{
				style: "currency",
				currency: "IDR",
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}
		);
		switch (columnKey) {
			case "date":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{formattedDate} {/* <<< order.createdAt */}
						</p>
					</div>
				);
			case "invoice":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{product.invoice}
						</p>
					</div>
				);
			case "receipt_number":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{product.receipt_number}
						</p>
					</div>
				);
			case "total_amount":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{formattedTotalAmount}
						</p>
					</div>
				);
			// case "action":
			// 	return (
			// 		<div className="flex items-center gap-4 w-full">
			// 			<p className="font-bold text-base w-full">
			// 				{`view detail`}
			// 			</p>
			// 		</div>
			// 	);
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
						dispatch(setPaginationTransaction(e, (e - 1) * 15));
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
							placeholder="Search for invoice by invoice "
							isClearable
							onClear={() => dispatch(setSearchTransaction(""))}
							startContent={<IoSearch opacity={".5"} />}
							variant="bordered"
							fullWidth
							onChange={(e) =>
								formik.setFieldValue(
									"searchQuery2",
									e.target.value
								)
							}
							value={formik.values.searchQuery2}
						/>
					</form>
					<div className="flex gap-3">
						<Button
							variant="bordered"
							className="border-neutral-200 dark:border-neutral-700 w-full"
							onClick={() => clear()}
						>{`Clear Filter(s)`}</Button>
						{/* <SelectWarehouses /> */}
						<div className="sort-by flex items-center">
							<SelectSortByT placeholder="Sort" />
						</div>
						{/* <MyMonthPicker /> */}
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Showing
						{transaction?.length
							? ` ${1 + offset}-${offset + transaction?.length} `
							: ` 0 `}
						out of {count} transaction.
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
					emptyContent={"data not found"}
					items={transaction} // <<<< ganti jadi orders / order_details (?)
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

export default AdminReportTransactionListTable;
