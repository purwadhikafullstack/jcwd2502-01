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
import { Link } from "react-router-dom";

const AdminProductListPage = () => {
	const products = useSelector((state) => state.products.products);

	const dispatch = useDispatch();

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
				<Link to={"/admin/add-product"}>
					<Button color="primary" size="md">
						<p className="font-medium text-black flex items-center gap-1">
							<span className="text-[20px]">+</span>
							<span>Add New Product</span>
						</p>
					</Button>
				</Link>
			</div>
			<div className="pb-12">
				<AdminProductListTable products={products} />
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminProductListPage;
