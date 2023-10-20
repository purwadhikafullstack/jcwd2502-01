import React, { useEffect, useState } from "react";

import ExploreProductsHeader from "../../components/sections/ExploreProductsHeader";
import ExploreProductsFilterMobile from "../../components/sections/ExploreProductsFilterMobile";
import ExploreProductsFilterAside from "../../components/sections/ExploreProductsFilterAside";
import ProductListFeed from "../../components/sections/ProductListFeed";
import { axiosInstance } from "../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { onClear, setSearch } from "../../redux/features/products";

const ExploreProductsPage = () => {
	const [categoriesList, setCategoriesList] = useState([]);
	const [brandsList, setBrandsList] = useState([]);
	const dispatch = useDispatch();
	const count = useSelector((state) => state.products.count);
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
		return () => {
			dispatch(onClear());
			dispatch(setSearch(""));
		};
	}, []);

	return (
		<>
			<main className="explore-products-page py-6 relative">
				<ExploreProductsHeader />
				<div className="result-body my-container md:flex md:py-4">
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
