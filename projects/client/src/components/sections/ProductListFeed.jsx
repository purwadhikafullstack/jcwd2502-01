import React from "react";

import ProductCard from "../uis/Cards/ProductCard";
import { Pagination } from "@nextui-org/react";

const ProductListFeed = () => {
	return (
		<>
			<div className="product-list md:w-full md:pl-8">
				<div className="grid-wrapper grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 py-4 md:py-0">
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</div>
				<div className="flex justify-center items-center py-12">
					<Pagination
						size="lg"
						showControls
						total={10}
						initialPage={1}
						color="secondary"
						variant="flat"
					/>
				</div>
			</div>
		</>
	);
};

export default ProductListFeed;
