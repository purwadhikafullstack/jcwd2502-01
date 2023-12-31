import React, { useEffect } from "react";
import ProductCard from "../../uis/Cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAsync } from "../../../redux/features/products";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const HomeProductFeeds = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);

	useEffect(() => {
		dispatch(fetchProductAsync());
	}, []);

	return (
		<section className="home-product-feeds my-container">
			<div className="py-8">
				<div className="section-title text-center mb-2 md:mb-6">
					<h2 className="text-headline-sm md:text-headline-lg font-bold">
						{t("guwtg")}
					</h2>
					<p className="text-body-sm md:text-body-lg text-neutral-600 dark:text-neutral-400">
						{t("guwtg_desc")}
					</p>
				</div>
				<div className="grid-wrapper grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 py-4">
					{products?.map((product) => {
						return <ProductCard data={product} />;
					})}
				</div>
				<div className="text-center py-8">
					<Link to={"/explore"}>
						<Button color="primary" size="lg">
							<span className="font-medium text-black">
								{t("explore_products")}
							</span>
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default HomeProductFeeds;
