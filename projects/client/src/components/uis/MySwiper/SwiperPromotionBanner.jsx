// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import MySwiperButtonPrev from "../MySwiperButtons/MySwiperButtonPrev";
import MySwiperButtonNext from "../MySwiperButtons/MySwiperButtonNext";

import BannerLogitech1 from "../../../assets/images/promotion-banners/banner_logitech.png";
import BannerRazer1 from "../../../assets/images/promotion-banners/banner_razer.png";

const SwiperPromotionBanner = ({ className }) => {
	return (
		<Swiper
			slidesPerView={1}
			grabCursor={true}
			loop={true}
			autoplay={{
				delay: 4000,
				disableOnInteraction: false,
			}}
			pagination={true}
			breakpoints={{
				320: {
					pagination: {
						type: "bullets",
						dynamicBullets: true,
					},
				},
				768: {
					pagination: {
						type: "bullets",
						clickable: true,
					},
				},
			}}
			modules={[Autoplay, Navigation, Pagination]}
			className={`mySwiper h-[220px] md:h-[80vh] w-full ${className} relative`}
		>
			<MySwiperButtonPrev />
			<SwiperSlide className="bg-neutral-800 h-full">
				<img
					src={BannerLogitech1}
					alt="logitech"
					className="w-full h-full object-cover"
				/>
			</SwiperSlide>
			<SwiperSlide className="bg-neutral-800 h-full">
				<img
					src={BannerRazer1}
					alt="razer"
					className="w-full h-full object-cover"
				/>
			</SwiperSlide>
			<MySwiperButtonNext />
		</Swiper>
	);
};

export default SwiperPromotionBanner;
