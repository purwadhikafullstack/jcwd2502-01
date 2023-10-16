import GearCategories from "../../components/sections/GearCategories";
import PromotionBanner from "../../components/sections/PromotionBanner";
import BestSellingGears from "../../components/sections/BestSellingGears";

const HomePage = () => {
	return (
		<>
			<main className="main-home-page bg-background">
				<PromotionBanner />
				<BestSellingGears />
				<GearCategories />
			</main>
		</>
	)
}

export default HomePage;