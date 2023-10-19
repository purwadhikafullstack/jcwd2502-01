import React from "react";

import ProductCard from "../uis/Cards/ProductCard";
import { Pagination } from "@nextui-org/react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	fetchProductAsync,
	onBrand,
	onCategory,
	onSearch,
	onSort,
	setPagination,
} from "../../redux/features/products";
import { useLocation, useNavigate } from "react-router-dom";

const ProductListFeed = () => {
	const products = useSelector((state) => state.products.products);
	const orderField = useSelector((state) => state.products.orderField);
	const orderDirection = useSelector(
		(state) => state.products.orderDirection
	);
	const search = useSelector((state) => state.products.search);
	const page = useSelector((state) => state.products.page);
	const offset = useSelector((state) => state.products.offset);
	const category = useSelector((state) => state.products.category);
	const brand = useSelector((state) => state.products.brand);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedSearch = queryParams.get("search");
		const selectedCategory = queryParams.get("category");
		const selectedBrand = queryParams.get("brand");
		const selectedOrderField = queryParams.get("orderField");
		const selectedOrderDirection = queryParams.get("orderDirection");
		const selectedOffset = queryParams.get("offset");
		if (selectedSearch) {
			dispatch(onSearch(selectedSearch));
		}
		if (selectedCategory) {
			dispatch(onCategory(selectedCategory));
		}
		if (selectedBrand) {
			dispatch(onBrand(selectedBrand));
		}
		if (selectedOrderDirection && selectedOrderField) {
			dispatch(onSort(selectedOrderField, selectedOrderDirection));
		}
		if (selectedOffset) {
			const selectedPage = Number(selectedOffset) / 12 + 1;
			dispatch(setPagination(selectedPage, Number(selectedOffset)));
		}
	};

	useEffect(() => {
		dispatch(fetchProductAsync());
		// fetchCategories();
		takeFromQuery();
	}, []);
	useEffect(() => {
		console.log(products);
	}, [products]);

	useEffect(() => {
		console.log(page);
		navigate(
			`/explore?search=${search}&brand=${brand}&category=${category}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
		);
		dispatch(
			fetchProductAsync(
				`?&search=${search}&brand=${brand}&category=${category}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
			)
		);
	}, [orderField, orderDirection, search, page, category, brand]);

	return (
		<>
			<div className="product-list md:w-full md:pl-8">
				<div className="grid-wrapper grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 py-4 md:py-0">
					{products?.map((product) => {
						return <ProductCard data={product} />;
					})}
				</div>
				<div className="flex justify-center items-center py-12">
					<Pagination
						size="md"
						showControls
						total={10}
						page={page ? page : 1}
						color="secondary"
						variant="flat"
						className="z-0"
						onChange={(e) =>
							dispatch(setPagination(e, (e - 1) * 12))
						}
					/>
				</div>
			</div>
		</>
	);
};

export default ProductListFeed;
