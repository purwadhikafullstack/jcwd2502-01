import React from "react";
import SwiperProductImages from "../../uis/MySwiper/SwiperProductImages";

const ProductMediaImage = () => {
	return (
		<div className="product-media">
			<div className="product-images-wrapper md:max-w-[348px] rounded-2xl">
				<SwiperProductImages />
			</div>
		</div>
	);
};

export default ProductMediaImage;
