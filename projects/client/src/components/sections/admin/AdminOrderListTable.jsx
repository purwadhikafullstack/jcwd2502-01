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
	Chip,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { axiosInstance } from "../../../lib/axios";
import { orderStatuses } from "../../../data/constant";
import { useLocation } from "react-router-dom";

import {
	onPageChange,
	onClear,
	setSearch,
	setStatus,
	setWarehouseId,
	fetchAdminOrderListAsync,
	updateUrl,
	setPage,
} from "../../../redux/features/orders";

import AdminReviewUserOrderModal from "./AdminReviewUserOrderModal";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import AdminCancelOrderModal from "./AdminCancelOrderModal";

const AdminOrderListTable = () => {
	const token = localStorage.getItem("accessToken");
	const location = useLocation();
	const dispatch = useDispatch();
	const [oneTime, setOneTime] = useState(false);
	const warehouse = useSelector((state) => state.products.warehouse);
	const role = useSelector((state) => state.user.role);

	const {
		orders,
		totalPages,
		page,
		offset,
		count,
		status,
		warehouseId,
		search,
	} = useSelector((state) => state.orders);

	const [searchQuery, setSearchQuery] = useState("");
	const [warehouses, setWarehouses] = useState([]);
	const [isPaginationVisible, setIsPaginationVisible] = useState(false);

	const fetchWarehouses = async () => {
		try {
			const { data } = await axiosInstance(token).get(`warehouses/all`);
			setWarehouses(data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handlePageChange = (newPage) => {
		dispatch(setPage(newPage));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleStatusChange = (newStatus) => {
		dispatch(setStatus(newStatus));
		dispatch(setPage(1));
	};

	const handleWarehouseChange = (newWarehouse) => {
		dispatch(setWarehouseId(newWarehouse));
		dispatch(setPage(1));
	};

	const handleSearch = (e) => {
		e.preventDefault();
		dispatch(onPageChange(token, 1, status, search, warehouseId));
	};

	const handleSearchChange = (e) => dispatch(setSearch(e?.target?.value));

	const debounceSearch = debounce(handleSearchChange, 900);

	const onClearSearch = () => {
		dispatch(onClear(token));
		setSearchQuery("");
	};

	const onClearRefresh = () => {
		if (role === "super") {
			dispatch(setWarehouseId(""));
			dispatch(updateUrl(1, "", "", ""));
			dispatch(fetchAdminOrderListAsync(token, 1, "", "", ""));
			dispatch(setPage(1));
			dispatch(setStatus(""));
			dispatch(setSearch(""));
			setSearchQuery("");
		}
		if (role === "admin") {
			dispatch(updateUrl(1, "", "", warehouseId));
			dispatch(fetchAdminOrderListAsync(token, 1, "", "", warehouseId));
			dispatch(setPage(1));
			dispatch(setStatus(""));
			dispatch(setSearch(""));
			setSearchQuery("");
		}
	};

	const columns = [
		{ name: "DATE", uid: "date" },
		{ name: "INVOICE", uid: "invoice" },
		{ name: "RECEIPT NUMBER", uid: "receipt_number" },
		{ name: "TOTAL ITEM", uid: "total_item" },
		{ name: "TOTAL AMOUNT", uid: "total_amount" },
		{ name: "STATUS", uid: "status" },
		{ name: "WAREHOUSE", uid: "warehouse" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const currentPage = +queryParams.get("page") || 1;
		const currentStatus = +queryParams.get("status") || "";
		const currentWarehouseId = +queryParams.get("warehouse") || "";
		const currentSearchQuery = +queryParams.get("search") || "";

		if (currentPage) {
			dispatch(setPage(currentPage));
		}
		if (currentStatus) {
			dispatch(setStatus(currentStatus));
		}
		if (currentWarehouseId) {
			dispatch(setWarehouseId(currentWarehouseId));
		}
		if (currentSearchQuery) {
			dispatch(setSearch(currentSearchQuery));
			setSearchQuery(currentSearchQuery);
		}
	};

	useEffect(() => {
		fetchWarehouses();
		takeFromQuery();

		window.scrollTo({ top: 0 });

		const timeoutId = setTimeout(() => {
			setIsPaginationVisible(true);
		}, 400);

		return () => clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		setOneTime(true);
	}, []);

	useEffect(() => {
		if (oneTime) {
			dispatch(updateUrl(page, status, search, warehouseId));

			dispatch(
				fetchAdminOrderListAsync(
					token,
					page,
					status,
					search,
					warehouseId
				)
			);
		}
	}, [token, status, page, search, warehouseId, oneTime, dispatch]);

	const renderPagination = () => {
		if (isPaginationVisible && totalPages) {
			return (
				<Pagination
					color="secondary"
					showControls
					total={totalPages || 1}
					page={page || 1}
					onChange={handlePageChange}
				/>
			);
		}
		return null;
	};

	const renderCell = React.useCallback((order, columnKey) => {
		const formattedDate = new Date(order.createdAt).toLocaleDateString(
			"en-GB",
			{
				day: "numeric",
				month: "short",
				year: "numeric",
			}
		);

		const formattedTotalAmount = order.total_amount?.toLocaleString(
			"id-ID",
			{
				style: "currency",
				currency: "IDR",
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}
		);

		const cellValue = order[columnKey];

		const renderAction = () => {
			if (order?.status === "1") {
				return <AdminCancelOrderModal orderId={order.id} />;
			} else if (order?.status === "2") {
				return <AdminReviewUserOrderModal orderDetailsData={order} />;
			} else if (order?.status === "3") {
				return <AdminReviewUserOrderModal orderDetailsData={order} />;
			} else if (order?.status === "4") {
				return (
					<Button
						isDisabled
						fullWidth
						variant="faded"
						color="primary"
					>
						Sending order
					</Button>
				);
			} else if (order?.status === "5") {
				return (
					<Button
						isDisabled
						fullWidth
						variant="faded"
						color="primary"
					>
						Order finished
					</Button>
				);
			} else if (order?.status === "6") {
				return (
					<Button isDisabled fullWidth variant="faded" color="danger">
						Order cancelled
					</Button>
				);
			} else {
				return null;
			}
		};

		switch (columnKey) {
			case "date":
				return (
					<div className="flex items-center gap-4 min-w-[140px]">
						<p className="text-base w-full">{formattedDate}</p>
					</div>
				);
			case "invoice":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="text-base w-full">{order.invoice}</p>
					</div>
				);
			case "receipt_number":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="text-base w-full">
							{order.receipt_number}
						</p>
					</div>
				);
			case "total_item":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="text-base w-full">{order.total_item}</p>
					</div>
				);
			case "total_amount":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="text-base w-full">
							{formattedTotalAmount}
						</p>
					</div>
				);
			case "status":
				return (
					<div className="flex items-center gap-4 w-full">
						<Chip>
							<p className="font-medium">
								{orderStatuses[Number(order.status) - 1].label}
							</p>
						</Chip>
					</div>
				);
			case "warehouse":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="text-base w-full">{`${order.warehouse.warehouse_name} (ID: ${order.warehouse.id})`}</p>
					</div>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-3 min-w-[220px]">
						{renderAction()}
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-center">
					<div className="w-full">
						<form className="w-[50%]" onSubmit={handleSearch}>
							<Input
								type="text"
								placeholder="Search for order by receipt number or invoice"
								isClearable
								onClear={onClearSearch}
								startContent={<IoSearch opacity={".5"} />}
								variant="bordered"
								fullWidth
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);
									debounceSearch(e);
								}}
							/>
						</form>
					</div>
					<div className="flex items-center gap-4">
						<Select
							items={orderStatuses}
							labelPlacement="outside-left"
							placeholder="Order Status"
							variant="bordered"
							size="md"
							className="min-w-[240px]"
							selectedKeys={status ? [status.toString()] : []}
						>
							{(status) => (
								<SelectItem
									key={status.value}
									onClick={() =>
										handleStatusChange(status.value)
									}
								>
									{status.label}
								</SelectItem>
							)}
						</Select>
						<Select
							items={warehouses}
							labelPlacement="outside-left"
							placeholder="Warehouse"
							variant="bordered"
							size="md"
							className="min-w-[240px]"
							selectedKeys={
								warehouseId ? [warehouseId.toString()] : []
							}
							isDisabled={role !== "super"}
						>
							{(warehouse) => (
								<SelectItem
									key={warehouse.id}
									onClick={() =>
										handleWarehouseChange(warehouse.id)
									}
								>
									{warehouse.warehouse_name}
								</SelectItem>
							)}
						</Select>
						{/* <Select
							items={warehouses}
							variant="bordered"
							className="min-w-[240px]"
							labelPlacement="outside-left"
							placeholder="Select warehouse"
							selectedKeys={warehouse ? [String(warehouse)] : []}
							isDisabled={role !== "super"}
						>
							{(warehouse) => (
								<SelectItem
									key={warehouse.id}
									value={warehouse.id}
									onClick={() =>
										dispatch(setWarehouse(warehouse.id))
									}
								>
									{warehouse.warehouse_name}
								</SelectItem>
							)}
						</Select> */}
						<Button
							fullWidth
							variant="bordered"
							onClick={onClearRefresh}
						>
							Clear Filter
						</Button>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Showing
						{orders?.length
							? ` ${1 + offset}-${offset + orders?.length} `
							: ` 0 `}
						out of {count} orders.
					</span>
				</div>
			</div>
			<Table
				aria-label="Example table with custom cells, pagination and sorting"
				isHeaderSticky
				fullWidth
				topContentPlacement="outside"
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							allowsSorting={column.sortable}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody emptyContent={"No data"} items={orders}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell className="py-4">
									{renderCell(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="py-4">{renderPagination()}</div>
		</>
	);
};

export default AdminOrderListTable;
