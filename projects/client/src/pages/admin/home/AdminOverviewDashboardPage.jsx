import React, { useEffect, useState } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import BestSellingGears from "../../../components/sections/public/BestSellingGears";
import { axiosInstance } from "../../../lib/axios";
import ProductCard from "../../../components/uis/Cards/ProductCard";

const AdminOverviewDashboardPage = () => {
	const [topSoldProducts, SetTopSoldProducts] = useState([]);

	const fetchTopSoldProducts = async () => {
		try {
			const { data } = await axiosInstance().get("products/top");

			SetTopSoldProducts(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTopSoldProducts();
	}, []);

	return (
		<AdminPageMainContainer>
			<h1 className="font-bold text-title-lg mb-4">Overview</h1>
			<div>
				<section className="best-selling bg-[#181818] p-4 border-2 border-neutral-400 border-opacity-50 rounded-xl">
					<h2 className="text-xl font-bold mb-2">Best selling</h2>
					<div className="grid grid-cols-6 gap-4">
						{topSoldProducts?.map((product) => {
							return <ProductCard data={product} admin={true} />;
						})}
					</div>
				</section>
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminOverviewDashboardPage;
