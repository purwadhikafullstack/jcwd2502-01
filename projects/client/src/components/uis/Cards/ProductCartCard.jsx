import React from "react";
import { Button, Checkbox, cn } from "@nextui-org/react";
import {
	IoAddCircleOutline,
	IoRemoveCircleOutline,
	IoTrashOutline,
} from "react-icons/io5";

const ProductCartCard = () => {
	return (
		<>
			<Checkbox
				classNames={{
					base: cn("max-w-full w-full"),
					label: "w-full",
				}}
			>
				<div className="product-cart-card w-full flex gap-2 justify-between ml-2 py-4">
					<div className="product-card-img-wrapper">
						<img
							src=""
							alt=""
							className="w-20 h-20 md:w-24 md:h-24 bg-primary-500 rounded-xl"
						/>
					</div>
					<div className="product-cart-info w-full">
						<div className="product-detail mb-2 ml-1">
							<p className="product-title text-body-md md:text-body-lg line-clamp-1">
								Logitech G102 Lightsync - Black
							</p>
							<div className="flex gap-1 md:gap-2 my-1">
								<p className="text-[10px] md:text-label-lg ">
									{"Logitech"} • {"Mouse"}
								</p>
							</div>
							<p className="price text-body-md md:text-price-sm font-bold">
								Rp 235.000
							</p>
						</div>
						<div className="product-cart-actions">
							<div className="bottom-right flex items-center justify-end gap-8">
								<Button
									isIconOnly
									variant="light"
									size="sm"
									radius="full"
								>
									<IoTrashOutline size={22} color="#efefef" />
								</Button>
								<div className="quantity-controller flex items-center w-[120px]">
									<Button
										isIconOnly
										color="primary"
										size="sm"
										variant="light"
										radius="full"
									>
										<IoRemoveCircleOutline
											size={24}
											color="#24ef00"
										/>
									</Button>
									<input
										type="number"
										className="bg-transparent text-center font-medium w-full outline-none text-body-md"
										value={120}
										min={1}
										max={999999}
									/>
									<Button
										isIconOnly
										color="primary"
										size="sm"
										variant="light"
										radius="full"
									>
										<IoAddCircleOutline
											size={24}
											color="#24ef00"
										/>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Checkbox>
		</>
	);
};

export default ProductCartCard;
