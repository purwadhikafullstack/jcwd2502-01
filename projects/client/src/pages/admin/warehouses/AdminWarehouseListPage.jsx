import React, { useEffect, useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	User,
	Chip,
	Tooltip,
	getKeyValue,
	Button,
} from "@nextui-org/react";

import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import CreateNewWarehouse from "../../../components/layouts/admin/CreateNewWarehouse";
import { axiosInstance } from "../../../lib/axios";

const statusColorMap = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};

const AdminWarehouseListPage = () => {
	const [warehouses, setWarehouses] = useState([]);

	const columns = [
		{ name: "NAME", uid: "name" },
		{ name: "PROVINCE", uid: "province" },
		{ name: "CITY", uid: "city" },
		{ name: "ADMIN", uid: "admin" },
	];

	const users = [
		{
			id: 1,
			name: "Tony Reichert",
			role: "CEO",
			team: "Management",
			status: "active",
			age: "29",
			avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
			email: "tony.reichert@example.com",
		},
		{
			id: 2,
			name: "Zoey Lang",
			role: "Technical Lead",
			team: "Development",
			status: "paused",
			age: "25",
			avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
			email: "zoey.lang@example.com",
		},
		{
			id: 3,
			name: "Jane Fisher",
			role: "Senior Developer",
			team: "Development",
			status: "active",
			age: "22",
			avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
			email: "jane.fisher@example.com",
		},
		{
			id: 4,
			name: "William Howard",
			role: "Community Manager",
			team: "Marketing",
			status: "vacation",
			age: "28",
			avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
			email: "william.howard@example.com",
		},
		{
			id: 5,
			name: "Kristen Copper",
			role: "Sales Manager",
			team: "Sales",
			status: "active",
			age: "24",
			avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
			email: "kristen.cooper@example.com",
		},
	];

	const renderCell = React.useCallback((warehouse, columnKey) => {
		switch (columnKey) {
			case "name":
				return (
					<User
						description={warehouse.warehouse_address}
						name={warehouse.warehouse_name}
					>
						{warehouse.warehouse_address}
					</User>
				);
			case "province":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">
							{warehouse.province.province}
						</p>
						{/* <p className="text-bold text-sm capitalize text-default-400">
							{user.team}
						</p> */}
					</div>
				);
			case "city":
				return (
					<Chip
						className="capitalize"
						// color={statusColorMap[user.status]}
						size="sm"
						variant="flat"
					>
						{warehouse.city.city_name}
					</Chip>
				);
			case "admin":
				return (
					<User
						description={warehouse.warehouse_name}
						name={warehouse.users[0]?.username}
					></User>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Details">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<IoEyeOutline size={24} />
							</span>
						</Tooltip>
						<Tooltip content="Edit user">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<BiEdit size={24} />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Delete user">
							<span className="text-lg text-danger cursor-pointer active:opacity-50">
								<IoTrashOutline size={24} />
							</span>
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
					<CreateNewWarehouse />
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
		</>
	);
};

export default AdminWarehouseListPage;
