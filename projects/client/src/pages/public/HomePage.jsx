import GearCategories from "../../components/sections/GearCategories";
import PromotionBanner from "../../components/sections/PromotionBanner";
import BestSellingGears from "../../components/sections/BestSellingGears";
import HomeProductFeeds from "../../components/sections/HomeProductFeeds";
import FooterPromotion from "../../components/sections/FooterPromotion";

const HomePage = () => {
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
