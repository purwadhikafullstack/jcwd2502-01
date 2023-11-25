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
	Pagination,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { IoTrashOutline, IoSearch } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { useStateContext } from "../../../contexts/ContextProvider";
import AdminEditCategoryModal from "../../../components/layouts/admin/AdminEditCategoryModal";
import { axiosInstance } from "../../../lib/axios";
import SelectSortBy from "../../../components/uis/Selects/SelectSortBy";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
	fetchCategoriesAsync,
	onClear,
	onSort,
	setBrands,
	setCategories,
	setCount,
	setOrderDirection,
	setOrderField,
	setPagination,
	setTotalPage,
} from "../../../redux/features/products";

const AdminCategoriesPage = () => {
	const { openEditCategoryModal, setOpenEditCategoryModal } =
		useStateContext();
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);
	const [selectedCategoryType, setSelectedCategoryType] = useState(null);

	const [oneTime, setOneTime] = useState(false);
	const [keyOrder, setKeyOrder] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const role = useSelector((state) => state.user.role);
	const categories = useSelector((state) => state.products.categories);
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
			dispatch(setCategories([]));
			dispatch(setCount(0));
		};
	}, []);

	useEffect(() => {
		if (oneTime) {
			navigate(
				`/admin/categories?orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
			);
			dispatch(
				fetchCategoriesAsync(
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
		} else if (
			orderField === "total_products" &&
			orderDirection === "desc"
		) {
			setKeyOrder("most");
		} else if (
			orderField === "total_products" &&
			orderDirection === "asc"
		) {
			setKeyOrder("least");
		} else if (orderField === "updatedAt" && orderDirection === "desc") {
			setKeyOrder("last_updated");
		}
	}, [orderField, orderDirection, offset, oneTime]);

	const onOpenEditCategoryModal = (category_id, category_type) => {
		setOpenEditCategoryModal(!openEditCategoryModal);
		setSelectedCategoryId(category_id);
		setSelectedCategoryType(category_type);
	};

	const onDelete = async (categoryId) => {
		try {
			const accessToken = localStorage.getItem("accessToken");

			//confirm

			await axiosInstance(accessToken).delete(`categories/${categoryId}`);
			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (openEditCategoryModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "scroll";
		}
	}, [openEditCategoryModal]);

	const columns = [
		{ name: "CATEGORY NAME", uid: "category_name" },
		{ name: "TOTAL PRODUCTS", uid: "total_products" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const renderCell = React.useCallback(
		(category, columnKey) => {
			switch (columnKey) {
				case "category_name":
					return <p>{category.category_type}</p>;
				case "total_products":
					return <p>{category?.total_products || "-"}</p>;
				case "actions":
					return (
						<div className="relative flex items-center gap-2">
							<Tooltip content="Edit category">
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
									isDisabled={role !== "super"}
								>
									<BiEdit size={24} />
								</Button>
							</Tooltip>
							<Tooltip color="danger" content="Remove category">
								<Button
									isIconOnly
									variant="light"
									className="text-lg text-danger cursor-pointer active:opacity-50"
									onClick={() => {
										onDelete(category.id);
									}}
									isDisabled={role !== "super"}
								>
									<IoTrashOutline size={24} />
								</Button>
							</Tooltip>
						</div>
					);
				default:
			}
		},
		[role]
	);

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
			<AdminPageMainContainer>
				<div className="admin-page-header flex justify-between gap-4 mb-6">
					<h1 className="font-bold text-title-lg">Categories</h1>
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
									keyOrder ? [String(keyOrder)] : null
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
										dispatch(onSort("category_type", "asc"))
									}
								>
									A-Z
								</SelectItem>
								<SelectItem
									key={"za"}
									value={"za"}
									onClick={() =>
										dispatch(
											onSort("category_type", "desc")
										)
									}
								>
									Z-A
								</SelectItem>
								<SelectItem
									key={"most"}
									value={"most"}
									onClick={() =>
										dispatch(
											onSort("total_products", "desc")
										)
									}
								>
									Most products
								</SelectItem>
								<SelectItem
									key={"least"}
									value={"least"}
									onClick={() =>
										dispatch(
											onSort("total_products", "asc")
										)
									}
								>
									Least products
								</SelectItem>
							</Select>
						</div>
					</div>
					<AdminCreateNewCategoryModal />
				</div>
				<Table
					aria-label="Example table with custom cells"
					bottomContent={bottomContent}
					bottomContentPlacement="outside"
				>
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
