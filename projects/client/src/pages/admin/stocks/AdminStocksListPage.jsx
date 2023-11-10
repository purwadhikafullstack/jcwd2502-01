import React, { useEffect } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAsync } from "../../../redux/features/products";
import { Button, Select, SelectItem } from "@nextui-org/react";
import AdminStocksListTable from "../../../components/sections/admin/AdminStocksListTable";
import { Link } from "react-router-dom";

const AdminStocksListPage = () => {
	const products = useSelector((state) => state.products.products);

	const warehouses = [
		{
			id: 1,
			warehouse_name: "Bandung",
			warehouse_address: "jl. something 1",
			city_id: 23,
			province_id: 9,
		},
		{
			id: 2,
			warehouse_name: "Tangerang",
			warehouse_address: "jl. something 2",
			city_id: 457,
			province_id: 3,
		},
		{
			id: 3,
			warehouse_name: "Jakarta",
			warehouse_address: "jl. something 3",
			city_id: 151,
			province_id: 6,
		},
	];

	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(fetchProductAsync());
	}, []);

	return (
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<div className="flex items-center">
					<h1 className="font-bold text-title-lg mr-4">Stocks</h1>
					<Select
						items={warehouses}
						size="sm"
						variant="bordered"
						className="min-w-[240px]"
						radius="lg"
						placeholder="Select warehouse"
					>
						{(warehouse) => (
							<SelectItem key={warehouse.id}>
								{warehouse.warehouse_name}
							</SelectItem>
						)}
					</Select>
				</div>
				<div>
					<Link to={"/admin/add-product"}>
						<Button color="primary" size="md">
							<p className="font-medium text-black flex items-center gap-1">
								<span className="text-[20px]">+</span>
								<span>Add New Product</span>
							</p>
						</Button>
					</Link>
				</div>
			</div>
			<div className="pb-12">
				<AdminStocksListTable products={products} />
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminStocksListPage;
