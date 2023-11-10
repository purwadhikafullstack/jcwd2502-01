import React, { useEffect } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAsync } from "../../../redux/features/products";
import { Button } from "@nextui-org/react";
import AdminStocksListTable from "../../../components/sections/admin/AdminStocksListTable";
import { Link } from "react-router-dom";

const AdminStocksListPage = () => {
	const products = useSelector((state) => state.products.products);

	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(fetchProductAsync());
	}, []);

	return (
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<h1 className="font-bold text-title-lg">Stocks</h1>
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
				<AdminStocksListTable products={products} />
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminStocksListPage;
