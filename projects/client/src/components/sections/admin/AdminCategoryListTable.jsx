import React from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
	Tooltip,
	Button,
} from "@nextui-org/react";
import { IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";

const AdminCategoryListTable = () => {
	const dummyCategories = [
		{
			id: 1,
			category_type: "Mouse",
			total_products: 100,
		},
		{
			id: 2,
			category_type: "Keyboard",
			total_products: 34,
		},
		{
			id: 3,
			category_type: "Controller",
			total_products: 40,
		},
		{
			id: 4,
			category_type: "Headset",
			total_products: 72,
		},
		{
			id: 5,
			category_type: "Monitor",
			total_products: 12,
		},
	];

	const columns = [
		{ name: "CATEGORY NAME", uid: "category_name" },
		{ name: "TOTAL PRODUCTS", uid: "total_products" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const renderCell = React.useCallback((category, columnKey) => {
		switch (columnKey) {
			case "category_name":
				return <p>{category.category_type}</p>;
			case "total_products":
				return <p>{category.total_products}</p>;
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Edit warehouse">
							<Button
								isIconOnly
								variant="light"
								className="text-lg text-default-400 cursor-pointer active:opacity-50"
							>
								<BiEdit size={24} />
							</Button>
						</Tooltip>
						<Tooltip color="danger" content="Remove warehouse">
							<Button
								isIconOnly
								variant="light"
								className="text-lg text-danger cursor-pointer active:opacity-50"
							>
								<IoTrashOutline size={24} />
							</Button>
						</Tooltip>
					</div>
				);
			default:
		}
	}, []);

	return (
		<Table aria-label="Example table with custom cells">
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "end" : "start"}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={dummyCategories}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default AdminCategoryListTable;
