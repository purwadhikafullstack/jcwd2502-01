import React from "react";
import { Button, Chip } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/carts";

const ProductCard = (props) => {
	const data = props.data;

	const productPrice = data?.product_price.toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const dispatch = useDispatch();

	return (
		<>
			<div className="product-card bg-white dark:bg-[#141414] rounded-[20px] flex flex-col items-start border-1 border-neutral-200 dark:border-neutral-800 hover:border-primary-100 dark:hover:border-primary-900 hover:shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)] duration-200 hover:cursor-pointer">
				<div className="image-wrapper aspect-square w-full">
					<img
						src={`http://localhost:8000/static/${data?.product_images[0].image.substring(
							7
						)}`}
						className="image aspect-square w-full h-full rounded-t-[20px] object-contain"
						alt={`${data?.product_images[0].image.substring(7)}`}
					/>
				</div>
				<div className="product-content min-w- w-full min-h-[160px] md:min-h-[200px] flex flex-col p-2 md:pt-2 md:px-2 md:pb-4">
					<span className="product-title font-medium text-body-sm md:text-body-lg line-clamp-2">
						{data?.product_name}
					</span>
					<div className="flex gap-1 md:gap-2 my-2">
						<Chip className="chip md:px-2" size="sm">
							<p className="text-[10px] md:text-label-lg">
								{data?.brand.brand_name}
							</p>
						</Chip>
						<Chip className="chip md:px-2" size="sm">
							<p className="text-[10px] md:text-label-lg">
								{data?.category.category_type}
							</p>
						</Chip>
					</div>
					<p className="price text-price-xs md:text-price-md font-bold">
						{productPrice}
					</p>
					<div className="w-full mt-auto">
						<Button
							fullWidth
							color="primary"
							onClick={() => dispatch(addToCart(1, data?.id))}
						>
							<span className="text-black font-medium flex items-center gap-2">
								<span className="text-[24px]">+</span> Add to
								cart
							</span>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductCard;
