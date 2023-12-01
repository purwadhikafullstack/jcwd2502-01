import React, { useEffect, useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	User,
	Tooltip,
	Button,
	Pagination,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { BiEdit } from "react-icons/bi";
import DefaultAvatar from "../../../assets/avatars/default_avatar.png";

import AdminCreateNewWarehouseModal from "../../../components/layouts/admin/AdminCreateNewWarehouseModal";
import AdminEditWarehouseModal from "../../../components/layouts/admin/AdminEditWarehouseModal";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
	fetchWarehousesAsync,
	onClear,
	onSort,
	setCount,
	setOrderDirection,
	setOrderField,
	setPagination,
	setTotalPage,
	setWarehouses,
} from "../../../redux/features/products";
import AdminDeleteWarehouseModal from "../../../components/sections/admin/AdminDeleteWarehouseModal";

const AdminWarehouseListPage = () => {
	const { openEditWarehouseModal, setOpenEditWarehouseModal } =
		useStateContext();
	const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);

	const [oneTime, setOneTime] = useState(false);
	const [keyOrder, setKeyOrder] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const warehouses = useSelector((state) => state.products.warehouses);
	const count = useSelector((state) => state.products.count);
	const totalPage = useSelector((state) => state.products.totalPage);

	const page = useSelector((state) => state.products.page);
	const offset = useSelector((state) => state.products.offset);
	const orderField = useSelector((state) => state.products.orderField);
	const orderDirection = useSelector(
		(state) => state.products.orderDirection
	);

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedOrderField = queryParams.get("orderField");
		const selectedOrderDirection = queryParams.get("orderDirection");
		const selectedOffset = queryParams.get("offset");
		if (selectedOrderField) {
			dispatch(setOrderField(selectedOrderField));
		}
		if (selectedOrderDirection) {
			dispatch(setOrderDirection(selectedOrderDirection));
		}
		if (!selectedOrderField && !selectedOrderDirection) {
			dispatch(setOrderField("updatedAt"));
			dispatch(setOrderDirection("desc"));
		}
		if (selectedOffset) {
			const selectedPage = Number(selectedOffset) / 12 + 1;
			dispatch(setPagination(selectedPage, Number(selectedOffset)));
		}
	};

	useEffect(() => {
		takeFromQuery();
		setOneTime(true);

		window.scrollTo({ top: 0 });

		return () => {
			dispatch(onClear());
			dispatch(setTotalPage(1));
			dispatch(setWarehouses([]));
			dispatch(setCount(0));
		};
	}, []);

	useEffect(() => {
		if (oneTime) {
			navigate(
				`/admin/warehouses?orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
			);
			dispatch(
				fetchWarehousesAsync(
					`?orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
				)
			);
		}
		if (orderField === "category_type" && orderDirection === "asc") {
			setKeyOrder("az");
		} else if (
			orderField === "category_type" &&
			orderDirection === "desc"
		) {
			setKeyOrder("za");
		} else if (orderField === "updatedAt" && orderDirection === "desc") {
			setKeyOrder("last_updated");
		}
	}, [orderField, orderDirection, offset, oneTime]);

	const onOpenEditWarehouseModal = (warehouse_id) => {
		setOpenEditWarehouseModal(!openEditWarehouseModal);
		setSelectedWarehouseId(warehouse_id);
	};

	useEffect(() => {
		if (openEditWarehouseModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "scroll";
		}
	}, [openEditWarehouseModal]);

	const columns = [
		{ name: "NAME", uid: "name" },
		{ name: "PROVINCE", uid: "province" },
		{ name: "CITY", uid: "city" },
		{ name: "ADMIN", uid: "admin" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const renderCell = React.useCallback((warehouse, columnKey) => {
		switch (columnKey) {
			case "name":
				return (
					<div className="max-w-[80%]">
						<p className="font-bold text-xl">
							{warehouse.warehouse_name}
						</p>
						<p className="line-clamp-1">
							{warehouse.warehouse_address}
						</p>
					</div>
				);
			case "province":
				return (
					<div className="flex flex-col min-w-[200px]">
						<p className="text-bold text-sm capitalize">
							{warehouse.province?.province}
						</p>
					</div>
				);
			case "city":
				return (
					<div className="flex flex-col min-w-[200px]">
						<p>{warehouse.city?.city_name}</p>
					</div>
				);
			case "admin":
				return (
					<div className="min-w-[200px]">
						<User
							description={warehouse?.warehouse_name}
							name={
								warehouse.users[0]?.username ||
								"no admin assigned"
							}
							avatarProps={{
								src: DefaultAvatar,
							}}
						/>
					</div>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						{/* <Tooltip content="Details">
							<Button
								isIconOnly
								variant="light"
								className="text-lg text-default-400 cursor-pointer active:opacity-50"
							>
								<IoEyeOutline size={24} />
							</Button>
						</Tooltip> */}
						<Tooltip content="Edit warehouse">
							<Button
								isIconOnly
								variant="light"
								className="text-lg text-default-400 cursor-pointer active:opacity-50"
								onPress={() => {
									onOpenEditWarehouseModal(warehouse.id);
								}}
							>
								<BiEdit size={24} />
							</Button>
						</Tooltip>
						<AdminDeleteWarehouseModal warehouseID={warehouse.id} />
					</div>
				);
			default:
			// return cellValue;
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
			<AdminPageMainContainer pageName={"admin-warehouse-list-page"}>
				<div className="flex justify-between mb-4">
					<h1 className="font-bold text-title-lg">Warehouses</h1>
				</div>
				<div className="w-full flex justify-between mb-4">
					<div className="sort-by flex items-center w-1/4">
						{/* <div className="min-w-[80px] font-medium">Sort by:</div>
						<SelectSortBy admin={true} /> */}
						<div className="sort-by flex items-center w-1/4">
							<div className="min-w-[80px] font-medium">
								Sort by:
							</div>
							<Select
								labelPlacement={"outside-left"}
								placeholder="Options"
								size="md"
								variant="bordered"
								className="min-w-[178px]"
								selectedKeys={
									keyOrder ? [String(keyOrder)] : []
								}
							>
								<SelectItem
									key={"last_updated"}
									value={"last_updated"}
									onClick={() =>
										dispatch(onSort("updatedAt", "desc"))
									}
								>
									Last updated
								</SelectItem>
								<SelectItem
									key={"az"}
									value={"az"}
									onClick={() =>
										dispatch(
											onSort("warehouse_name", "asc")
										)
									}
								>
									A-Z
								</SelectItem>
								<SelectItem
									key={"za"}
									value={"za"}
									onClick={() =>
										dispatch(
											onSort("warehouse_name", "desc")
										)
									}
								>
									Z-A
								</SelectItem>
							</Select>
						</div>
					</div>
					<AdminCreateNewWarehouseModal />
				</div>
				<Table
					aria-label="Example table with custom cells"
					bottomContent={bottomContent}
					bottomContentPlacement="outside"
				>
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn key={column.uid} align={"center"}>
								{column.name}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody items={warehouses}>
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
			</AdminPageMainContainer>

			{openEditWarehouseModal ? (
				<AdminEditWarehouseModal
					handleOpenEditWarehouseModal={onOpenEditWarehouseModal}
					warehouseId={selectedWarehouseId}
				/>
			) : null}
		</>
	);
};

export default AdminWarehouseListPage;
