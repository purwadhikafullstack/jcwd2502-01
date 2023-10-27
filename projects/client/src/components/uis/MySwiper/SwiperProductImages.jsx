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

import { Image } from "@nextui-org/react";

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
				<SwiperSlide className="h-full">
					<Image
						src={`https://source.unsplash.com/random/300×300`}
						alt="logitech"
						className="w-full h-full aspect-square object-cover rounded-none"
					/>
				</SwiperSlide>
				<SwiperSlide className="h-full">
					<Image
						src={`https://source.unsplash.com/random/300×302`}
						alt="razer"
						className="w-full h-full aspect-square object-cover rounded-none"
					/>
				</SwiperSlide>
				<SwiperSlide className="h-full">
					<Image
						src={`https://source.unsplash.com/random/300×303`}
						alt="logitech"
						className="w-full h-full aspect-square object-cover rounded-none"
					/>
				</SwiperSlide>
				<SwiperSlide className="h-full">
					<Image
						src={`https://source.unsplash.com/random/300×304`}
						alt="razer"
						className="w-full h-full aspect-square object-cover rounded-none"
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
