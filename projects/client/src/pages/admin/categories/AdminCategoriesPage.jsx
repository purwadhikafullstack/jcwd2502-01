import React, { useState } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import AdminCreateNewCategoryModal from "../../../components/layouts/admin/AdminCreateNewCategoryModal";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Tooltip,
	Button,
	Input,
} from "@nextui-org/react";
import { IoTrashOutline, IoSearch } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { useStateContext } from "../../../contexts/ContextProvider";
import AdminEditCategoryModal from "../../../components/layouts/admin/AdminEditCategoryModal";

const AdminCategoriesPage = () => {
	const { openEditCategoryModal, setOpenEditCategoryModal } =
		useStateContext();
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);

	const onOpenEditCategoryModal = (category_id) => {
		setOpenEditCategoryModal(!openEditCategoryModal);
		setSelectedCategoryId(category_id);
	};

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
								onPress={() => {
									onOpenEditCategoryModal(category.id);
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
								// onClick={() => {
								// 	onDelete(warehouse.id);
								// }}
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
		<>
			<AdminPageMainContainer>
				<div className="admin-page-header flex justify-between gap-4 mb-6">
					<h1 className="font-bold text-title-lg">Categories</h1>
					<Input
						type="text"
						placeholder="Search categories"
						isClearable
						// onClear={() => dispatch(setSearch(""))}
						startContent={<IoSearch opacity={".5"} />}
						variant="bordered"
						fullWidth
						// onChange={(e) =>
						// 	formik.setFieldValue("searchQuery", e.target.value)
						// }
						// value={formik.values.searchQuery}
					/>
					<AdminCreateNewCategoryModal />
				</div>
				<Table aria-label="Example table with custom cells">
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn
								key={column.uid}
								align={
									column.uid === "actions" ? "end" : "start"
								}
							>
								{column.name}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody items={dummyCategories}>
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
				</Table>{" "}
			</AdminPageMainContainer>

			{openEditCategoryModal ? (
				<AdminEditCategoryModal
					handleOpenEditCategoryModal={onOpenEditCategoryModal}
					categoryId={selectedCategoryId}
				/>
			) : null}
		</>
	);
};

export default AdminCategoriesPage;
