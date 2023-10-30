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
} from "@nextui-org/react";

import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";

import CreateNewWarehouseModal from "../../../components/layouts/admin/CreateNewWarehouseModal";
import { axiosInstance } from "../../../lib/axios";
import EditWarehouseModal from "../../../components/layouts/admin/EditWarehouseModal";

const AdminWarehouseListPage = () => {
	const [openEditWarehouseModal, setOpenEditWarehouseModal] = useState(false);
	const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
	const [warehouses, setWarehouses] = useState([]);

	const onOpenEditWarehouseModal = (warehouse_id) => {
		setOpenEditWarehouseModal(!openEditWarehouseModal);
		setSelectedWarehouseId(warehouse_id);
	};

	const columns = [
		{ name: "NAME", uid: "name" },
		{ name: "PROVINCE", uid: "province" },
		{ name: "CITY", uid: "city" },
		{ name: "ADMIN", uid: "admin" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const onDelete = async (warehouseId) => {
		//confirm
		await axiosInstance().delete(`warehouses/${warehouseId}`);
		window.location.reload(false);
	};

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
							name={warehouse.users[0]?.username}
						></User>
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
						<Tooltip color="danger" content="Remove warehouse">
							<Button
								isIconOnly
								variant="light"
								className="text-lg text-danger cursor-pointer active:opacity-50"
								onClick={() => {
									onDelete(warehouse.id);
								}}
							>
								<IoTrashOutline size={24} />
							</Button>
						</Tooltip>
					</div>
				);
			default:
			// return cellValue;
		}
	}, []);

	const fetchWarehouses = async () => {
		try {
			// const accessToken = localStorage.getItem("accessToken");
			const { data } = await axiosInstance().get(`warehouses/all`);

			setWarehouses(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchWarehouses();
	}, []);

	return (
		<>
			<main className="admin-warehouse-list-page my-container min-h-screen py-8">
				<div className="flex justify-between mb-4">
					<h1 className="font-bold text-title-lg">Warehouses</h1>
					<CreateNewWarehouseModal />
				</div>
				<Table aria-label="Example table with custom cells">
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
			</main>
			<EditWarehouseModal
				open={openEditWarehouseModal}
				handleOpenEditWarehouseModal={onOpenEditWarehouseModal}
				warehouseId={selectedWarehouseId}
			/>
		</>
	);
};

export default AdminWarehouseListPage;
