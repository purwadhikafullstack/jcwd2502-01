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
	Pagination,
	Select,
	SelectItem,
} from "@nextui-org/react";
import AdminEditCategoryModal from "../../../components/layouts/admin/AdminEditCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
	fetchCategoriesAsync,
	onClear,
	onSort,
	setCategories,
	setCount,
	setOrderDirection,
	setOrderField,
	setPagination,
	setTotalPage,
} from "../../../redux/features/products";
import AdminDeleteCategoryModal from "../../../components/sections/admin/AdminDeleteCategoryModal";

const AdminCategoriesPage = () => {
	const [oneTime, setOneTime] = useState(false);
	const [keyOrder, setKeyOrder] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const role = useSelector((state) => state.user.role);
	const {
		categories,
		count,
		totalPage,
		page,
		offset,
		orderField,
		orderDirection,
	} = useSelector((state) => state.products);

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
							<AdminEditCategoryModal
								categoryId={category.id}
								categoryType={category.category_type}
							/>
							<AdminDeleteCategoryModal
								categoryID={category.id}
							/>
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
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<h1 className="font-bold text-title-lg">Categories</h1>
			</div>
			<div className="w-full flex justify-between mb-4">
				<div className="sort-by flex items-center w-1/4">
					<div className="sort-by flex items-center w-1/4">
						<div className="min-w-[80px] font-medium">Sort by:</div>
						<Select
							labelPlacement={"outside-left"}
							placeholder="Options"
							size="md"
							variant="bordered"
							className="min-w-[178px]"
							selectedKeys={keyOrder ? [String(keyOrder)] : []}
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
									dispatch(onSort("category_type", "desc"))
								}
							>
								Z-A
							</SelectItem>
							<SelectItem
								key={"most"}
								value={"most"}
								onClick={() =>
									dispatch(onSort("total_products", "desc"))
								}
							>
								Most products
							</SelectItem>
							<SelectItem
								key={"least"}
								value={"least"}
								onClick={() =>
									dispatch(onSort("total_products", "asc"))
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
							align={column.uid === "actions" ? "end" : "start"}
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
			</Table>
		</AdminPageMainContainer>
	);
};

export default AdminCategoriesPage;
