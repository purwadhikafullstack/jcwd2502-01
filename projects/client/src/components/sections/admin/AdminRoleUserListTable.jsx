import React from "react";
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
	Pagination,
	Input,
	Button,
} from "@nextui-org/react";
import SelectWarehouses from "../../uis/Selects/SelectWarehouses";
import SelectSortBy from "../../uis/Selects/SelectSortBy";

const AdminRoleUserListTable = () => {
	const columns = [
		{ name: "NAME", uid: "name" },
		{ name: "EMAIL", uid: "email" },
		{ name: "ROLE", uid: "role" },
		{ name: "STATUS", uid: "status" },
		{ name: "ACTIONS", uid: "actions" },
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

	const renderCell = React.useCallback((user, columnKey) => {
		const cellValue = user[columnKey];

		switch (columnKey) {
			case "name":
				return (
					<User
						avatarProps={{ radius: "full", src: user.avatar }}
						name={cellValue}
					>
						{user.email}
					</User>
				);
			case "email":
				return <p className="font-medium">{user.email}</p>;
			case "role":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">
							{cellValue}
						</p>
					</div>
				);
			case "status":
				return (
					<Chip className="capitalize" size="sm" variant="flat">
						{cellValue}
					</Chip>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<Button variant="faded" color="danger">
							Delete User
						</Button>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	const bottomContent = React.useMemo(
		() => {
			return (
				<div className="py-2 px-2 flex justify-between items-center">
					<Pagination
						size="md"
						showControls
						// total={totalPage ? totalPage : 1}
						// page={page ? page : 0}
						color="secondary"
						variant="flat"
						className="z-0"
						// onChange={(e) => {
						// 	dispatch(setPagination(e, (e - 1) * 12));
						// 	window.scrollTo({ top: 0, behavior: "smooth" });
						// }}
					/>
				</div>
			);
		},
		[
			// totalPage,
			// page
		]
	);

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-center">
					<form
						className="w-[30%]"
						// onSubmit={handleSubmitSearch}
					>
						<Input
							type="text"
							placeholder="Search for user by name"
							isClearable
							// onClear={() => dispatch(setSearch(""))}
							// startContent={<IoSearch opacity={".5"} />}
							variant="bordered"
							fullWidth
							// onChange={(e) =>
							// 	formik.setFieldValue(
							// 		"searchQuery",
							// 		e.target.value
							// 	)
							// }
							// value={formik.values.searchQuery}
						/>
					</form>
				</div>
			</div>
			<Table
				aria-label="Example table with custom cells"
				bottomContent={bottomContent}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							align={
								column.uid === "actions" ? "center" : "start"
							}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={users}>
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

export default AdminRoleUserListTable;
