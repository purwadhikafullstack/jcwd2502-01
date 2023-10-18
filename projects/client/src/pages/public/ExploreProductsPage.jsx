import React from "react";

import ExploreProductsHeader from "../../components/sections/ExploreProductsHeader";
import ExploreProductsSubheadingFilter from "../../components/sections/ExploreProductsFilterMobile";
import ExploreProductsFilterAside from "../../components/sections/ExploreProductsFilterAside";
import ProductListFeed from "../../components/sections/ProductListFeed";

const ExploreProductsPage = () => {
	return (
		<>
			<main className="explore-products-page py-6 relative">
				<ExploreProductsHeader />
				<div className="result-body my-container md:flex md:py-4">
					<ExploreProductsSubheadingFilter />
					<ExploreProductsFilterAside />
					<ProductListFeed />
				</div>
			</main>
		</>
	);
};

export default ExploreProductsPage;
