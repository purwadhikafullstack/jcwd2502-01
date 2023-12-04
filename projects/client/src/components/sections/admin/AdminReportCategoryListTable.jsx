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
import SelectSortByC from "../../uis/Selects/SelectSortByC";
import { setWarehouse } from "../../../redux/features/products";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SelectWarehouses from "../../uis/Selects/SelectWarehouses";
import MyMonthPicker from "../../uis/MyMonthPicker/MyMonthPicker";
import {
	getTransactionByCategory,
	onSearchCategory,
	onClearCategory,
	setTotalPageCategory,
	setSearchCategory,
	setPaginationCategory,
	onSortC,
	setCountCategory,
	setMonth,
	setYear,
} from "../../../redux/features/report";

const AdminReportCategoryListTable = () => {
	const [oneTime, setOneTime] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const transactionByCategory = useSelector(
		(state) => state.report.transactionByCategory
	);
	const warehouse = useSelector((state) => state.products.warehouse);
	const role = useSelector((state) => state.user.role);
	const count = useSelector((state) => state.report.countCategory);
	const totalPage = useSelector((state) => state.report.totalPageCategory);
	const orderFieldCategory = useSelector(
		(state) => state.report.orderFieldCategory
	);
	const orderDirectionCategory = useSelector(
		(state) => state.report.orderDirectionCategory
	);
	const search = useSelector((state) => state.report.searchCategory);
	const page = useSelector((state) => state.report.totalPageCategory);
	const offset = useSelector((state) => state.report.offsetCategory);
	const month = useSelector((state) => state.report.month);
	const year = useSelector((state) => state.report.year);

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedWarehouse = queryParams.get("warehouse");
		const selectedSearch = queryParams.get("searchCategory");
		const selectedOrderField = queryParams.get("orderFieldCategory");
		const selectedOrderDirection = queryParams.get(
			"orderDirectionCategory"
		);
		const selectedOffset = queryParams.get("offsetCategory");
		const selectedMonth = queryParams.get("month");
		const selectedYear = queryParams.get("year");
		if (selectedWarehouse) {
			dispatch(setWarehouse(selectedWarehouse));
		}
		if (selectedSearch) {
			dispatch(onSearchCategory(selectedSearch));
		}
		if (selectedOrderDirection && selectedOrderField) {
			dispatch(onSortC(selectedOrderField, selectedOrderDirection));
		}
		if (selectedOffset) {
			const selectedPage = Number(selectedOffset) / 12 + 1;
			dispatch(
				setPaginationCategory(selectedPage, Number(selectedOffset))
			);
		}
		if (selectedMonth && selectedYear) {
			dispatch(setMonth(selectedMonth));
			dispatch(setYear(selectedYear));
		}
	};

	const formik = useFormik({
		initialValues: { searchQuery: "" },
		onSubmit: (values) => {
			// Handle the search query submission here
			dispatch(onSearchCategory(values.searchQuery));
			navigate(
				`/admin/reports?warehouse=${
					warehouse !== null ? `${warehouse}` : ""
				}&searchCategory=${
					search !== null ? `${search}` : ""
				}&orderFieldCategory=${
					orderFieldCategory !== null ? `${orderFieldCategory}` : ""
				}&orderDirectionCategory=${
					orderDirectionCategory !== null
						? `${orderDirectionCategory}`
						: ""
				}&offsetCategory=${offset}&month=${
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
		formik.setFieldValue("searchQuery", search);
	}, [search]);

	const clear = async () => {
		await dispatch(onClearCategory());
		if (role === "super") {
			dispatch(setWarehouse(null));
			// window.location.reload();
			return navigate(
				`/admin/reports?warehouse=${
					warehouse !== null ? `${warehouse}` : ""
				}&searchCategory=${
					search !== null ? `${search}` : ""
				}&orderFieldCategory=${
					orderFieldCategory !== null ? `${orderFieldCategory}` : ""
				}&orderDirectionCategory=${
					orderDirectionCategory !== null
						? `${orderDirectionCategory}`
						: ""
				}&offsetCategory=${offset}&month=${
					month !== null ? `${month}` : ""
				}&year=${year !== null ? `${year}` : ""}`
			);
		}
		navigate(
			`/admin/reports?warehouse=${
				warehouse !== null ? `${warehouse}` : ""
			}&searchCategory=${
				search !== null ? `${search}` : ""
			}&orderFieldCategory=${
				orderFieldCategory !== null ? `${orderFieldCategory}` : ""
			}&orderDirectionCategory=${
				orderDirectionCategory !== null
					? `${orderDirectionCategory}`
					: ""
			}&offsetCategory=${offset}&month=${
				month !== null ? `${month}` : ""
			}&year=${year !== null ? `${year}` : ""}`
		);
		// window.location.reload();
	};

	useEffect(() => {
		takeFromQuery();

		window.scrollTo({ top: 0 });
		setOneTime(true);
		// return () => {
		// 	dispatch(onClearCategory());
		// 	dispatch(setSearchCategory(""));
		// 	// dispatch(setProductsForStocks([]));
		// 	dispatch(setTotalPageCategory(1));
		// 	// dispatch(setWarehouse(null));
		// 	dispatch(setCountCategory(0));
		// };
	}, []);

	useEffect(() => {
		if (oneTime) {
			navigate(
				`/admin/reports?warehouse=${
					warehouse !== null ? `${warehouse}` : ""
				}&searchCategory=${
					search !== null ? `${search}` : ""
				}&orderFieldCategory=${
					orderFieldCategory !== null ? `${orderFieldCategory}` : ""
				}&orderDirectionCategory=${
					orderDirectionCategory !== null
						? `${orderDirectionCategory}`
						: ""
				}&offsetCategory=${offset}&month=${
					month !== null ? `${month}` : ""
				}&year=${year !== null ? `${year}` : ""}`
			);

			dispatch(
				getTransactionByCategory(
					`?warehouse=${
						warehouse !== null ? `${warehouse}` : ""
					}&search=${search !== null ? `${search}` : ""}&orderField=${
						orderFieldCategory !== null
							? `${orderFieldCategory}`
							: ""
					}&orderDirection=${
						orderDirectionCategory !== null
							? `${orderDirectionCategory}`
							: ""
					}&offset=${offset}&month=${
						month !== null ? `${month}` : ""
					}&year=${year !== null ? `${year}` : ""}`
				)
				// getTransactionByCategory()
			);
		}
	}, [
		orderFieldCategory,
		orderDirectionCategory,
		search,
		page,
		warehouse,
		month,
		year,
		oneTime,
	]);

	const columns = [
		{ name: "CATEGORY NAME", uid: "category_name" },
		{ name: "TOTAL", uid: "total" },
	];

	const renderCell = React.useCallback((TBCategory, columnKey) => {
		switch (columnKey) {
			case "category_name":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{`${TBCategory.category_type}`}
						</p>
					</div>
				);
			case "total":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{`${TBCategory.total_items}`}
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
						dispatch(setPaginationCategory(e, (e - 1) * 12));
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
							onClear={() => dispatch(setSearchCategory(""))}
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
						{/* <SelectWarehouses /> */}
						<div className="sort-by flex items-center">
							<SelectSortByC placeholder="Sort" />
						</div>
						{/* <MyMonthPicker /> */}
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Showing
						{transactionByCategory?.length
							? ` ${1 + offset}-${
									offset + transactionByCategory?.length
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
					emptyContent={"No data"}
					items={transactionByCategory} // <<<< ganti jadi orders / order_details (?)
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
