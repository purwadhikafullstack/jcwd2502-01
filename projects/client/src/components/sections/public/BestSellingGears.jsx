import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SwiperBestSellingGears from "../../uis/MySwiper/SwiperBestSellingGears";
import { axiosInstance } from "../../../lib/axios";

const BestSellingGears = () => {
	const { t } = useTranslation();

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

	useEffect(() => {
		console.log(topSoldProducts);
	}, [topSoldProducts]);

	return (
		<section className="top-deals my-container rounded-[20px] relative">
			<div className="py-8">
				<h2 className="font-bold text-headline-sm mb-4">
					{/* Best Selling Gears! */}
					{t("best_selling_gears")}
				</h2>
				<SwiperBestSellingGears topSoldProducts={topSoldProducts} />
			</div>
		</section>
	);
};

export default BestSellingGears;
