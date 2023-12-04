import React, { useEffect, useState } from "react";

import ProductCard from "../../uis/Cards/ProductCard";
import { Pagination } from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";

import {
	fetchProductAsync,
	onSearch,
	onSort,
	setBrand,
	setCategory,
	setPagination,
} from "../../../redux/features/products";

import NotFound from "../../../assets/illustrations/NotFoundillustration.png";
import { useLocation, useNavigate } from "react-router-dom";

const ProductListFeed = (props) => {
	const [oneTime, setOneTime] = useState(false);

	const products = useSelector((state) => state.products.products);
	const count = useSelector((state) => state.products.count);
	const totalPage = useSelector((state) => state.products.totalPage);
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
			dispatch(setCategory(selectedCategory));
		}
		if (selectedBrand) {
			dispatch(setBrand(selectedBrand));
		}
		if (selectedOrderDirection && selectedOrderField) {
			dispatch(onSort(selectedOrderField, selectedOrderDirection));
		}
		if (selectedOffset) {
			const selectedPage = Number(selectedOffset) / 12 + 1;
			dispatch(setPagination(selectedPage, Number(selectedOffset)));
		}
	};

	const renderProductFeed = () => {
		return products?.map((product) => {
			return <ProductCard data={product} />;
		});
	};

	useEffect(() => {
		takeFromQuery();
		setOneTime(true);
	}, []);

	useEffect(() => {
		if (oneTime) {
			navigate(
				`/explore?search=${search}&brand=${brand.join(
					","
				)}&category=${category.join(
					","
				)}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
			);

			dispatch(
				fetchProductAsync(
					`?&search=${search}&brand=${brand.join(
						","
					)}&category=${category.join(
						","
					)}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
				)
			);
		}
	}, [orderField, orderDirection, search, page, category, brand, oneTime]);

	return (
		<div className="product-list md:w-full md:h-full md:pl-8">
			{products?.length ? (
				<div className="grid-wrapper grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 py-4 md:py-0">
					{renderProductFeed()}
				</div>
			) : (
				<div className="w-full h-[50vh] py-4">
					<img
						src={NotFound}
						alt=""
						className="w-44 md:w-64 mx-auto mt-8"
					/>

					<h1 className="font-bold text-title-lg text-center pt-4">
						Product not found
					</h1>
				</div>
			)}
			<div className="flex justify-center items-center pt-12 pb-12 md:pb-0 ">
				<Pagination
					size="md"
					showControls
					total={totalPage ? totalPage : 1}
					page={page ? page : 0}
					color="secondary"
					variant="flat"
					className="z-0"
					onChange={(e) => {
						dispatch(setPagination(e, (e - 1) * 12));
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				/>
			</div>
		</div>
	);
};

export default ProductListFeed;
