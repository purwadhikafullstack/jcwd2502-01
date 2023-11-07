import React from "react";

import SwiperPromotionBanner from "../../uis/MySwiper/SwiperPromotionBanner";

const PromotionBanner = () => {
	return (
		<section className="home-banner">
			<div className="md:flex gap-4">
				<SwiperPromotionBanner />
			</div>
		</section>
	);
};

export default PromotionBanner;
