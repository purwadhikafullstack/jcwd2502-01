import { useEffect } from "react";

import GearCategories from "../../components/sections/public/GearCategories";
import PromotionBanner from "../../components/sections/public/PromotionBanner";
import BestSellingGears from "../../components/sections/public/BestSellingGears";
import HomeProductFeeds from "../../components/sections/public/HomeProductFeeds";
import FooterPromotion from "../../components/sections/public/FooterPromotion";

const HomePage = () => {
	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<main className="main-home-page bg-background">
				<PromotionBanner />
				<BestSellingGears />
				<GearCategories />
				<HomeProductFeeds />
				<FooterPromotion />
			</main>
	);
};

export default HomePage;
