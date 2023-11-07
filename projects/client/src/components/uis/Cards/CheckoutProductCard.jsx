import React, { useEffect } from "react";

import { Image } from "@nextui-org/react";

const CheckoutProductCard = ({ checkedoutProductData }) => {
	const { product, quantity } = checkedoutProductData;

	const productPrice = product?.product_price.toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const subtotalProductPrice = Number(
		product?.product_price * quantity
	).toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	return (
		<div className="checkout-product-card p-4 md:p-6 bg-neutral-100 md:bg-secondary-50 dark:bg-neutral-900 md:dark:bg-secondary-800 border-2 border-neutral-200 dark:border-neutral-800 rounded-xl">
			<p className="font-bold mb-2 -mt-2">Order 1</p>
			<div className="checkout-product-card-content flex gap-4 w-full h-full">
				<div className="product-image w-24 h-24 md:w-28 md:h-28 aspect-square">
					<Image
						src={`${
							process.env.REACT_APP_IMAGE_API
						}${product?.product_images[0].image.substring(7)}`}
						alt=""
						className="w-full h-full aspect-square bg-white object-contain"
					/>
				</div>
				<div className="product-content flex flex-col w-full h-auto">
					<p className="font-medium text-label-lg line-clamp-2 md:text-body-lg">
						{product?.product_name}
					</p>
					<div className="item-weight text-body-md hidden md:block mt-2">
						<p>
							{quantity} item{" "}
							{`(${product?.specification?.weight}/item)`}
						</p>
					</div>
					<div className="product-order-price my-2">
						<p className="produc-price font-bold text-label-lg md:text-body-lg">
							{quantity} x {productPrice}
						</p>
					</div>
					<div className="subtotal-price flex justify-between items-center mt-auto">
						<p className="text-label-lg">Subtotal</p>
						<p className="text-label-lg md:text-body-lg font-bold text-right">
							{subtotalProductPrice}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutProductCard;
