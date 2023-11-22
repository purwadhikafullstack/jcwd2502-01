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
	Tooltip,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { axiosInstance } from "../../../lib/axios";
import { orderStatuses } from "../../../data/constant";
import { useLocation } from "react-router-dom";

import { FaCheck, FaXmark } from "react-icons/fa6";
import AdminViewOrderDetailsModal from "./AdminViewOrderDetailsModal";

const AdminOrderListTable = () => {
	const token = localStorage.getItem("accessToken");
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);
	const currentPage = +queryParams.get("page") || 1;
	const currentStatus = +queryParams.get("status") || "";

	const [orders, setOrders] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [offset, setOffset] = useState(0);
	const [count, setCount] = useState(0);
	const [isPaginationVisible, setIsPaginationVisible] = useState(false);
	const [status, setStatus] = useState("");
	const [searchQuery, setSearchQuery] = useState(""); // Add state for the search query
	const [page, setPage] = useState("");

	const fetchAllUserOrderList = async (page, status = "", search = "") => {
		try {
			const { data } = await axiosInstance(token).get(
				`orders/admin/order-list?page=${page}&status=${status}&search=${search}`
			);

			console.log(data.data);

			setOrders(data.data.orderList);
			setTotalPages(data.data.pagination.totalPages);
			setOffset(data.data.pagination.offset);
			setCount(data.data.pagination.count);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePageChange = (newPage) => {
		fetchAllUserOrderList(newPage, status);
		updateUrl(newPage, status);
		setPage(newPage);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleStatusChange = (newStatus) => {
		setPage(1);
		fetchAllUserOrderList(1, newStatus);
		updateUrl(1, newStatus);
		setStatus(newStatus);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		setPage(1);
		fetchAllUserOrderList(1, status, searchQuery);
		updateUrl(1, status, searchQuery);
	};

	const onClear = () => {
		setSearchQuery("");
		fetchAllUserOrderList(1, "", "");
		updateUrl(1, "", "");
	};

	const updateUrl = (page, status, search) => {
		const params = new URLSearchParams();
		if (page) params.set("page", page);
		if (status) params.set("status", status);
		if (search) params.set("search", search);

		const queryString = params.toString();
		const newUrl = queryString
			? `${window.location.pathname}?${queryString}`
			: window.location.pathname;

		window.history.replaceState({}, "", newUrl);
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

	useEffect(() => {
		fetchAllUserOrderList(currentPage, currentStatus, "");

		window.scrollTo({ top: 0 });

		const timeoutId = setTimeout(() => {
			setIsPaginationVisible(true);
		}, 400);

		return () => clearTimeout(timeoutId);
	}, [currentPage]);

	const renderPagination = () => {
		if (isPaginationVisible && totalPages) {
			return (
				<Pagination
					color="secondary"
					showControls
					total={totalPages || 1}
					page={currentPage || 1}
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
						<p className="text-base w-full">
							{`${order.warehouse.warehouse_name} (ID: ${order.warehouse.id})`}
						</p>
					</div>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-3">
						<AdminViewOrderDetailsModal orderDetailsData={order} />
						{/* <Tooltip content="Accept Order">
							<Button isIconOnly variant="faded" color="primary">
								<FaCheck size={20} />
							</Button>
						</Tooltip>
						<Tooltip content="Reject Order">
							<Button isIconOnly variant="faded" color="danger">
								<FaXmark size={20} />
							</Button>
						</Tooltip> */}
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
					<form className="w-[30%]" onSubmit={handleSearch}>
						<Input
							type="text"
							placeholder="Search for order by receipt number or invoice"
							isClearable
							onClear={onClear}
							startContent={<IoSearch opacity={".5"} />}
							variant="bordered"
							fullWidth
							onChange={(e) => setSearchQuery(e.target.value)}
							value={searchQuery}
						/>
					</form>
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
							// className={
							// 	column.uid === "product_info" &&
							// 	"w-full md:w-[40%]"
							// }
							allowsSorting={column.sortable}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					emptyContent={"Please select warehouse"}
					items={orders}
				>
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
