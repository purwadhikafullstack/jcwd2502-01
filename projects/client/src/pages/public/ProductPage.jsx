import React, { useEffect, useState } from "react";

import Footer from "../../components/layouts/shared/Footer";
import ProductMediaImage from "../../components/layouts/user/ProductMediaImage";
import ProductDetailContent from "../../components/sections/public/ProductDetailContent";
import OrderAction from "../../components/layouts/user/OrderAction";
import { axiosInstance } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProductDetail } from "../../redux/features/products";

const ProductPage = () => {
	const { productName } = useParams();

	const dispatch = useDispatch();

	const fetchProduct = async () => {
		try {
			const { data } = await axiosInstance().get(
				`products/${productName}`
			);

			dispatch(setProductDetail(data.data));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProduct();
		window.scrollTo({ top: 0 });
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
