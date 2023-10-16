import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation, FreeMode, Autoplay } from 'swiper/modules';

import ProductCard from '../uis/ProductCard/ProductCard';
import MySwiperButtonPrev from '../uis/MySwiperButtons/MySwiperButtonPrev';
import MySwiperButtonNext from '../uis/MySwiperButtons/MySwiperButtonNext';

const SwiperBestSellingGears = () => {
	return (
		<>
			<Swiper
				slidesPerView={2}
				loop={true}
				spaceBetween={10}
				autoplay={{
					delay: 3500,
					disableOnInteraction: false
				}}
				freeMode={true}
				centeredSlides={true}
				modules={[Autoplay, Navigation, FreeMode]}
				className={`mySwiper h-full rounded-[20px] w-full`}
			>
				<MySwiperButtonPrev />
				<SwiperSlide><ProductCard /></SwiperSlide>
				<SwiperSlide><ProductCard /></SwiperSlide>
				<SwiperSlide><ProductCard /></SwiperSlide>
				<SwiperSlide><ProductCard /></SwiperSlide>
				<SwiperSlide><ProductCard /></SwiperSlide>
				<SwiperSlide><ProductCard /></SwiperSlide>
				<SwiperSlide><ProductCard /></SwiperSlide>
				<SwiperSlide><ProductCard /></SwiperSlide>
				<MySwiperButtonNext />
			</Swiper>
		</>
	)
}

export default SwiperBestSellingGears