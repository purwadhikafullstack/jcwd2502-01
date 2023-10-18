import React from "react";
import { Chip } from "@nextui-org/react";

const ProductCard = () => {
	return (
		<>
			<div className="product-card bg-background rounded-[20px] flex flex-col items-start border-1 border-neutral-200 hover:border-primary-500 dark:border-neutral-800 hover:dark:border-secondary-500 hover:shadow-md hover:shadow-primary-200 dark:hover:shadow-secondary-500 duration-200 hover:cursor-pointer">
				<div className="image-wrapper aspect-square w-full h-full">
					<img
						src={`http://localhost:8000/api/1.png`}
						className="image w-full h-full bg-primary-500 rounded-t-[20px]"
						alt="product_image"
					/>
				</div>
				<div className="product-content flex flex-col p-2 md:pt-2 md:px-2 md:pb-4">
					<span className="product-title font-medium text-body-sm md:text-body-lg">
						Logitech G102 Lightsync
					</span>
					<div className="frame-8 flex gap-2 my-2">
						<Chip className="chip md:px-2" size="sm">
							<p className="text-[10px] md:text-label-lg">
								Logitech
							</p>
						</Chip>
						<Chip className="chip md:px-2" size="sm">
							<p className="text-[10px] md:text-label-lg">
								Mouse
							</p>
						</Chip>
					</div>
					<p className="price text-price-xs md:text-price-md font-bold">
						Rp. 350.000
					</p>
					<p className="location text-label-sm md:text-body-sm">
						Tangerang Selatan
					</p>
				</div>
			</div>
		</>
	);
};

export default ProductCard;
