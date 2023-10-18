import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, FreeMode, Autoplay } from "swiper/modules";

import ProductCard from "../uis/Cards/ProductCard";
import MySwiperButtonPrev from "../uis/MySwiperButtons/MySwiperButtonPrev";
import MySwiperButtonNext from "../uis/MySwiperButtons/MySwiperButtonNext";

const SwiperBestSellingGears = () => {
	return (
		<>
			<Swiper
				autoplay={{
					delay: 3500,
					disableOnInteraction: false,
				}}
				breakpoints={{
					320: {
						slidesPerView: 2,
						centeredSlides: true,
						spaceBetween: 10,
						loop: true,
					},
					768: {
						slidesPerView: 4.4,
						spaceBetween: 20,
					},
				}}
				modules={[Autoplay, Navigation, FreeMode]}
				className={`mySwiper h-full w-full`}
			>
				<MySwiperButtonPrev />
				<SwiperSlide className="my-2">
					<ProductCard />
				</SwiperSlide>
				<SwiperSlide className="my-2">
					<ProductCard />
				</SwiperSlide>
				<SwiperSlide className="my-2">
					<ProductCard />
				</SwiperSlide>
				<SwiperSlide className="my-2">
					<ProductCard />
				</SwiperSlide>
				<SwiperSlide className="my-2">
					<ProductCard />
				</SwiperSlide>
				<SwiperSlide className="my-2">
					<ProductCard />
				</SwiperSlide>
				<SwiperSlide className="my-2">
					<ProductCard />
				</SwiperSlide>
				<SwiperSlide className="my-2">
					<ProductCard />
				</SwiperSlide>
				<MySwiperButtonNext />
			</Swiper>
		</>
	);
};

export default SwiperBestSellingGears;
