import React, { useEffect, useState } from "react";
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
import { axiosInstance } from "../../../lib/axios";

const AdminCategoriesPage = () => {
	const { openEditCategoryModal, setOpenEditCategoryModal } =
		useStateContext();
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);
	const [selectedCategoryType, setSelectedCategoryType] = useState(null);
	const [categories, setCategories] = useState([]);

	const onOpenEditCategoryModal = (category_id, category_type) => {
		setOpenEditCategoryModal(!openEditCategoryModal);
		setSelectedCategoryId(category_id);
		setSelectedCategoryType(category_type);
	};

	const fetchCategories = async () => {
		try {
			// const accessToken = localStorage.getItem("accessToken");
			const { data } = await axiosInstance().get(`categories/all`);

			setCategories(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	const onDelete = async (categoryId) => {
		try {
			// const accessToken = localStorage.getItem("accessToken");

			//confirm

			await axiosInstance().delete(`categories/${categoryId}`);
			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

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
				return <p>{category.products[0]?.total_products || "-"}</p>;
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Edit warehouse">
							<Button
								isIconOnly
								variant="light"
								className="text-lg text-default-400 cursor-pointer active:opacity-50"
								onPress={() => {
									onOpenEditCategoryModal(
										category.id,
										category.category_type
									);
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
									onDelete(category.id);
								}}
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
					<TableBody items={categories}>
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
					categoryType={selectedCategoryType}
				/>
			) : null}
		</>
	);
};

export default AdminCategoriesPage;
