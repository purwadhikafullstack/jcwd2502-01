import GearCategories from "../../components/sections/GearCategories";
import PromotionBanner from "../../components/sections/PromotionBanner";
import BestSellingGears from "../../components/sections/BestSellingGears";
import HomeProductFeeds from "../../components/sections/HomeProductFeeds";
import FooterPromotion from "../../components/sections/FooterPromotion";
import { useEffect } from "react";

const HomePage = () => {
	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<>
			<main className="main-home-page bg-background">
				<PromotionBanner />
				<BestSellingGears />
				<GearCategories />
				<HomeProductFeeds />
				<FooterPromotion />
			</main>
		</>
	);
};

export default HomePage;
