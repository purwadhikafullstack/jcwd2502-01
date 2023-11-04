import React from "react";
import { Chip, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
	const data = props.data;

	const productPrice = data?.product_price.toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const encodedProductName = encodeURIComponent(data?.product_name);

	return (
		<Link to={`/product/${encodedProductName}`}>
			<div className="product-card bg-white dark:bg-[#161616] rounded-[20px] flex flex-col items-start border-1 border-neutral-200 dark:border-neutral-800 hover:border-primary-100 dark:hover:border-primary-900 hover:shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)] duration-200 hover:cursor-pointer select-none">
				<div className="image-wrapper aspect-square w-full">
					<Image
						radius="none"
						src={`${
							process.env.REACT_APP_IMAGE_API
						}${data?.product_images[0].image.substring(7)}`}
						className="image aspect-square w-full h-full rounded-t-[19px] object-contain"
						alt={`${data?.product_images[0].image.substring(7)}`}
					/>
				</div>
				<div className="product-content min-w- w-full min-h-[128px] md:min-h-[160px] flex flex-col p-2 md:pt-2 md:px-2 md:pb-4">
					<span className="product-title font-medium text-body-sm md:text-body-lg line-clamp-2">
						{data?.product_name}
					</span>
					<div className="flex gap-1 md:gap-2 my-2">
						<Chip
							className="chip md:px-2"
							size="sm"
							color="secondary"
						>
							<p className="text-[10px] md:text-label-lg">
								{data?.brand.brand_name}
							</p>
						</Chip>
						<Chip
							className="chip md:px-2"
							size="sm"
							color="secondary"
						>
							<p className="text-[10px] md:text-label-lg">
								{data?.category.category_type}
							</p>
						</Chip>
					</div>
					<p className="price text-price-xs md:text-price-md font-bold">
						{productPrice}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
