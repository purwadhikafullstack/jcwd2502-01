import {
	Button,
	Chip,
	Pagination,
	Select,
	SelectItem,
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
	fetchStockMutationsAsync,
	onClear,
	onSearch,
	onSort,
	setBrand,
	setCategory,
	setCount,
	setPagination,
	setProductsForStocks,
	setSearch,
	setStatus,
	setStockMutations,
	setTotalPage,
	setWarehouse,
} from "../../../redux/features/products";
import { axiosInstance } from "../../../lib/axios";

const AdminIncomingStocksTable = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const warehouse = useSelector((state) => state.products.warehouse);
	const stockMutations = useSelector(
		(state) => state.products.stockMutations
	);
	const count = useSelector((state) => state.products.count);
	const totalPage = useSelector((state) => state.products.totalPage);

	const page = useSelector((state) => state.products.page);
	const offset = useSelector((state) => state.products.offset);
	const status = useSelector((state) => state.products.status);

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedWarehouse = queryParams.get("warehouse");
		const selectedStatus = queryParams.get("status");
		const selectedOffset = queryParams.get("offset");
		if (selectedWarehouse) {
			dispatch(setWarehouse(selectedWarehouse));
		}
		if (selectedStatus) {
			dispatch(setStatus(selectedStatus));
		}
		if (selectedOffset) {
			const selectedPage = Number(selectedOffset) / 12 + 1;
			dispatch(setPagination(selectedPage, Number(selectedOffset)));
		}
	};

	const handleAction = async (action, mutationId) => {
		await axiosInstance().patch(`stocks/mutation/${mutationId}`, {
			status: action,
		});
		dispatch(
			fetchStockMutationsAsync(
				"in",
				`?warehouse=${warehouse}&status=${status}&offset=${offset}`
			)
		);
	};
	useEffect(() => {
		takeFromQuery();

		window.scrollTo({ top: 0 });

		return () => {
			dispatch(onClear());
			dispatch(setSearch(""));
			dispatch(setTotalPage(1));
			dispatch(setWarehouse(null));
			dispatch(setStockMutations([]));
			dispatch(setCount(0));
			dispatch(setStatus("pending"));
		};
	}, []);

	useEffect(() => {
		if (warehouse) {
			navigate(
				`/admin/stocks?warehouse=${warehouse}&status=${status}&offset=${offset}`
			);
			dispatch(
				fetchStockMutationsAsync(
					"in",
					`?warehouse=${warehouse}&status=${status}&offset=${offset}`
				)
			);
		}
	}, [status, page, warehouse]);

	const columns = [
		{ name: "DATE", uid: "date" },
		{ name: "PRODUCT INFO", uid: "product_info" },
		{ name: "FROM", uid: "from" },
		{ name: "QUANTITY", uid: "quantity" },
		{ name: "STOCK", uid: "stock" },
		{ name: "STATUS", uid: "status" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const renderCell = React.useCallback((request, columnKey) => {
		switch (columnKey) {
			case "date":
				return (
					<div className="flex items-center gap-4 w-[240px] md:w-full">
						<p className="font-medium text-base line-clamp-1">
							{request?.createdAt.substring(0, 10)}
						</p>
					</div>
				);
			case "product_info":
				return (
					<div className="flex items-center gap-4 w-[240px] md:w-full">
						<p className="font-medium text-base line-clamp-1">
							{request?.product?.product_name}
						</p>
					</div>
				);
			case "from":
				return (
					<p className="text-base line-clamp-1">
						{request?.warehouse_from?.warehouse_name}
					</p>
				);
			case "quantity":
				return (
					<p className="text-base line-clamp-1">
						{request?.quantity}
					</p>
				);
			case "stock":
				return (
					<p className="text-base line-clamp-1">
						{request?.product?.stocks[0]?.stocks}
					</p>
				);
			case "status":
				return <Chip>{request?.status}</Chip>;
			case "actions":
				return (
					request?.status === "pending" && (
						<div className="relative flex justify-start items-center gap-2">
							<Button
								onClick={() =>
									handleAction("accepted", request.id)
								}
								variant="flat"
								className="bg-red-600"
							>
								<span className="font-medium text-white">
									Accept
								</span>
							</Button>
							<Button
								onClick={() =>
									handleAction("rejected", request.id)
								}
								variant="flat"
								className="bg-primary-600"
							>
								<span className="font-medium text-white">
									Reject
								</span>
							</Button>
						</div>
					)
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
						{/* <div className="select-brands">
							<SelectProductBrands />
						</div>
						<div className="select-categories">
							<SelectProductCategories />
						</div> */}
						{/* <Button
							variant="bordered"
							className="border-neutral-200 dark:border-neutral-700"
							onClick={() => clear()}
						>{`Clear Filter(s)`}</Button> */}
						<div className="sort-by ml-auto flex items-center">
							<div className="w-full mr-2 font-medium">
								Status:
							</div>
							<Select
								labelPlacement={"outside-left"}
								placeholder="Options"
								size="md"
								variant="bordered"
								className="min-w-[178px]"
								selectedKeys={
									status ? [String(status)] : ["all"]
								}
							>
								<SelectItem
									key={"all"}
									value={"all"}
									onClick={() => dispatch(setStatus(""))}
								>
									Show All
								</SelectItem>
								<SelectItem
									key={"accepted"}
									value={"accepted"}
									onClick={() =>
										dispatch(setStatus("accepted"))
									}
								>
									Accepted
								</SelectItem>
								<SelectItem
									key={"pending"}
									value={"pending"}
									onClick={() =>
										dispatch(setStatus("pending"))
									}
								>
									Pending
								</SelectItem>
								<SelectItem
									key={"rejected"}
									value={"rejected"}
									onClick={() =>
										dispatch(setStatus("rejected"))
									}
								>
									Rejected
								</SelectItem>
								<SelectItem
									key={"canceled"}
									value={"canceled"}
									onClick={() =>
										dispatch(setStatus("canceled"))
									}
								>
									Canceled
								</SelectItem>
							</Select>
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Showing
						{stockMutations?.length
							? ` ${1 + offset}-${
									offset + stockMutations?.length
							  } `
							: ` 0 `}
						out of {count} requests.
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
					emptyContent={"No request available"}
					items={stockMutations}
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

export default AdminIncomingStocksTable;
