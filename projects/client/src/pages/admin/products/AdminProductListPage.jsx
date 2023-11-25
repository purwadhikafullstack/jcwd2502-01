import React, { useEffect } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProductAsync,
	onClear,
	setSearch,
} from "../../../redux/features/products";
import { Button } from "@nextui-org/react";
import AdminProductListTable from "../../../components/sections/admin/AdminProductListTable";
import { Link, useNavigate } from "react-router-dom";

const AdminProductListPage = () => {
	const role = useSelector((state) => state.user.role);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onAdd = () => {
		navigate("/admin/add-product");
	};

	useEffect(() => {
		// dispatch(fetchProductAsync());

		return () => {
			dispatch(onClear());
			dispatch(setSearch(""));
		};
	}, []);

	return (
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<h1 className="font-bold text-title-lg">Products</h1>
				{/* <Link to={"/admin/add-product"}> */}
				<Button
					color="primary"
					size="md"
					onClick={() => onAdd}
					isDisabled={role !== "super"}
				>
					<p className="font-medium text-black flex items-center gap-1">
						<span className="text-[20px]">+</span>
						<span>Add New Product</span>
					</p>
				</Button>
				{/* </Link> */}
			</div>
			<div className="pb-12">
				<AdminProductListTable />
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminProductListPage;
