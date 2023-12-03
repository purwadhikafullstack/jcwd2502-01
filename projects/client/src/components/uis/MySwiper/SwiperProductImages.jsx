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
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DefaultProductImg from "./../../../assets/logo/nexo_sqr.png";

const SwiperProductImages = () => {
	const [productImages, setProductImages] = useState([]);

	const productDetail = useSelector((state) => state.products.productDetail);

	const renderProductImages = () => {
		if (productImages?.length) {
			return productImages?.map((image) => {
				return (
					<SwiperSlide className="h-full">
						<Image
							src={`${
								process.env.REACT_APP_IMAGE_API
							}${image.image.substring(7)}`}
							alt="logitech"
							className="w-full h-full aspect-square object-contain bg-white rounded-none"
						/>
					</SwiperSlide>
				);
			});
		} else {
			return (
				<SwiperSlide className="h-full">
					<Image
						src={DefaultProductImg}
						alt="logitech"
						className="w-full h-full aspect-square object-contain rounded-none"
					/>
				</SwiperSlide>
			);
		}
	};

	useEffect(() => {
		if (productDetail) {
			setProductImages(productDetail?.product_images);
		}
	}, [productDetail]);

	return (
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
			{renderProductImages()}
			<div className="opacity-0 group-hover:opacity-100">
				<MySwiperButtonNext />
			</div>
		</Swiper>
	);
};

export default SwiperProductImages;
