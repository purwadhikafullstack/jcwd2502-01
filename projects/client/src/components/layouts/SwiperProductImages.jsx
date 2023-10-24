// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import MySwiperButtonPrev from "../uis/MySwiperButtons/MySwiperButtonPrev";
import MySwiperButtonNext from "../uis/MySwiperButtons/MySwiperButtonNext";

import BannerLogitech1 from "../../assets/images/promotion-banners/banner_logitech.png";
import BannerRazer1 from "../../assets/images/promotion-banners/banner_razer.png";

const SwiperProductImages = () => {
	return (
		<>
			<Swiper
				loop={true}
				slidesPerView={1}
				pagination={true}
				breakpoints={{
					320: {
						pagination: {
							type: "fraction",
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
				className={`mySwiper aspect-square h-full w-full relative md:rounded-2xl group`}
			>
				<div className="opacity-0 group-hover:opacity-100">
					<MySwiperButtonPrev />
				</div>
				<SwiperSlide className="bg-primary-500 h-full">
					<img
						src={BannerLogitech1}
						alt="logitech"
						className="w-full h-full aspect-square object-cover"
					/>
				</SwiperSlide>
				<SwiperSlide className="bg-primary-500 h-full">
					<img
						src={BannerRazer1}
						alt="razer"
						className="w-full h-full aspect-square object-cover"
					/>
				</SwiperSlide>
				<SwiperSlide className="bg-primary-500 h-full">
					<img
						src={BannerLogitech1}
						alt="logitech"
						className="w-full h-full aspect-square object-cover"
					/>
				</SwiperSlide>
				<SwiperSlide className="bg-primary-500 h-full">
					<img
						src={BannerRazer1}
						alt="razer"
						className="w-full h-full aspect-square object-cover"
					/>
				</SwiperSlide>
				<div className="opacity-0 group-hover:opacity-100">
					<MySwiperButtonNext />
				</div>
			</Swiper>
		</>
	);
};

export default SwiperProductImages;
