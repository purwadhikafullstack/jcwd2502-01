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

const SwiperPromotionBanner = ({ className }) => {
	return (
		<Swiper
			slidesPerView={1}
			loop={true}
			autoplay={{
				delay: 3500,
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
			className={`mySwiper h-[240px] md:h-[70vh] w-full ${className} relative`}
		>
			<MySwiperButtonPrev />
			<SwiperSlide className="bg-primary-500 h-full">Slide 1</SwiperSlide>
			<SwiperSlide className="bg-primary-500 h-full">Slide 2</SwiperSlide>
			<SwiperSlide className="bg-primary-500 h-full">Slide 3</SwiperSlide>
			<SwiperSlide className="bg-primary-500 h-full">Slide 4</SwiperSlide>
			<SwiperSlide className="bg-primary-500 h-full">Slide 5</SwiperSlide>
			<SwiperSlide className="bg-primary-500 h-full">Slide 6</SwiperSlide>
			<SwiperSlide className="bg-primary-500 h-full">Slide 7</SwiperSlide>
			<SwiperSlide className="bg-primary-500 h-full">Slide 8</SwiperSlide>
			<SwiperSlide className="bg-primary-500 h-full">Slide 9</SwiperSlide>
			<MySwiperButtonNext />
		</Swiper>
	);
};

export default SwiperPromotionBanner;
