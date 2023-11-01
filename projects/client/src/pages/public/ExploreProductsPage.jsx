import React, { useEffect, useState } from "react";

import ExploreProductsHeader from "../../components/sections/public/ExploreProductsHeader";
import ExploreProductsFilterMobile from "../../components/sections/public/ExploreProductsFilterMobile";
import ExploreProductsFilterAside from "../../components/sections/public/ExploreProductsFilterAside";
import ProductListFeed from "../../components/sections/public/ProductListFeed";
import { axiosInstance } from "../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { onClear, setSearch } from "../../redux/features/products";

const ExploreProductsPage = () => {
	const [categoriesList, setCategoriesList] = useState([]);
	const [brandsList, setBrandsList] = useState([]);

	const dispatch = useDispatch();

	const count = useSelector((state) => state.products.count);
	const search = useSelector((state) => state.products.search);

	const totalPage = Math.ceil(count / 12);

	const fetchCategoriesAsync = async () => {
		try {
			const { data } = await axiosInstance().get(`categories/all`);
			setCategoriesList(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchBrandsAsync = async () => {
		try {
			const { data } = await axiosInstance().get(`brands/all`);
			setBrandsList(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchCategoriesAsync();
		fetchBrandsAsync();

		window.scrollTo({ top: 0 });

		return () => {
			dispatch(onClear());
			dispatch(setSearch(""));
		};
	}, []);

	return (
		<>
			<main
				className={`explore-products-page ${
					search ? "py-6" : "py-0"
				} relative`}
			>
				<ExploreProductsHeader />
				<div
					className={`result-body my-container md:flex ${
						search ? "md:pt-4 md:pb-4" : "md:pt-[88px] md:pb-4"
					} md:mb-10`}
				>
					<ExploreProductsFilterMobile
						categoriesData={categoriesList}
						brandsData={brandsList}
					/>
					<ExploreProductsFilterAside
						categoriesData={categoriesList}
						brandsData={brandsList}
					/>
					<ProductListFeed totalPage={totalPage} />
				</div>
			</main>
		</>
	);
};

export default ExploreProductsPage;
