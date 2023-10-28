import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, FreeMode, Autoplay } from "swiper/modules";

import ProductCard from "../Cards/ProductCard";
import MySwiperButtonPrev from "../MySwiperButtons/MySwiperButtonPrev";
import MySwiperButtonNext from "../MySwiperButtons/MySwiperButtonNext";

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
						slidesPerView: 1.4,
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
				className={`mySwiper w-full`}
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
