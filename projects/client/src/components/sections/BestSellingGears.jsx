import React from "react";

import SwiperBestSellingGears from "../uis/MySwiper/SwiperBestSellingGears";

const BestSellingGears = () => {
	return (
		<>
			<section className="top-deals my-container rounded-[20px] relative">
				<div className="py-8">
					<h2 className="font-bold text-headline-sm mb-4">
						Best Selling Gears!
					</h2>
					<SwiperBestSellingGears />
				</div>
			</section>
		</>
	);
};

export default BestSellingGears;
