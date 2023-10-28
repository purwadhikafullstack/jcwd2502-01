import React, { useEffect, useState } from "react";

import Footer from "../../components/layouts/Footer";
import ProductMediaImage from "../../components/layouts/ProductMediaImage";
import ProductDetailContent from "../../components/sections/ProductDetailContent";
import OrderAction from "../../components/layouts/OrderAction";
import { axiosInstance } from "../../lib/axios";
import { useParams } from "react-router-dom";

const ProductPage = () => {
	const { productName } = useParams();
	const [productDetail, setProductDetail] = useState([]);

	const fetchProduct = async () => {
		try {
			// const accessToken = localStorage.getItem("accessToken");
			const { data } = await axiosInstance().get(
				`products/${productName}`
			);
			setProductDetail(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProduct();
	}, []);

	return (
		<>
			<main className="product-page pb-48 md:max-w-[1232px] md:mx-auto md:py-12 md:pb-20 md:min-h-[88vh]">
				<section className="md:grid md:grid-cols-3 relative">
					<ProductMediaImage />
					<ProductDetailContent />
					<OrderAction />
				</section>
			</main>
			<footer className="hidden md:block">
				<Footer />
			</footer>
		</>
	);
};

export default ProductPage;
