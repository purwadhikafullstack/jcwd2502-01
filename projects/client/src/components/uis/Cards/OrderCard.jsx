import React from "react";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import {
	Button,
	Card,
	Chip,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Image,
} from "@nextui-org/react";
import Media from "react-media";
import { IoEllipsisVertical } from "react-icons/io5";
import { orderStatuses } from "../../../data/constant";
import OrderDetailsModal from "../../layouts/user/OrderDetailsModal";
import { Link } from "react-router-dom";

const OrderCard = ({ orderData }) => {
	const {
		total_amount,
		shipping_cost,
		invoice,
		order_details,
		status,
		receipt_number,
		createdAt,
	} = orderData;

	const date = new Date(createdAt);

	const formattedDateString = date.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	const formattedPriceString =
		order_details[0]?.checked_out_price?.toLocaleString("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});

	const formattedTotalShoppingString = (
		total_amount + shipping_cost
	).toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	return (
		<Media
			queries={{
				medium: "(min-width: 768px)",
			}}
		>
			{(matches) => (
				<Card className="order-card p-2 md:p-6">
					<section className="upper flex justify-between md:items-center md:justify-start gap-4 mb-4">
						<div className="left flex gap-2 md:gap-4 items-center">
							<HiOutlineShoppingBag
								size={22}
								className="stroke-2"
							/>
							<div className="date font-medium text-label-md md:text-base">
								{formattedDateString}
							</div>
						</div>
						<div className="right">
							<Chip
								color="secondary"
								size={matches.medium ? "md" : "sm"}
								radius="sm"
							>
								<span className="text-white font-medium text-label-md md:text-label-lg">
									{orderStatuses[Number(status) - 1].label}
								</span>
							</Chip>
						</div>
						{matches.medium && (
							<div className="invoice">{invoice}</div>
						)}
					</section>
					<section className="middle flex">
						<div className="product-info w-[calc(100%-200px)] flex-grow">
							<div className="flex w-full">
								<div className="product-image w-[68px] md:w-[100px] mr-2 md:mr-4 box-border">
									<Image
										src={`${
											process.env.REACT_APP_IMAGE_API
										}${order_details[0]?.product?.product_images[0]?.image.substring(
											7
										)}`}
										// src={`${process.env.REACT_APP_IMAGE_API}1.png`}
										alt="logitech"
										className="w-full h-full aspect-square object-contain bg-white"
									/>
								</div>
								<div className="product-details w-full md:pr-4">
									<div>
										<h6 className="product-name font-bold text-body-md md:text-lg line-clamp-1">
											{
												order_details[0]?.product
													?.product_name
											}
										</h6>
									</div>
									<div>
										<p className="text-label-md md:text-body-lg">
											{order_details[0]?.quantity}{" "}
											{order_details[0]?.quantity > 1
												? "items"
												: "item"}{" "}
											x {formattedPriceString}
										</p>
									</div>
									{order_details?.length >= 2 ? (
										<div className="other-product text-label-md md:text-label-lg md:mt-2">
											+{order_details?.length - 1} other
											products
										</div>
									) : null}
								</div>
							</div>
						</div>
						<div className="right total-shopping hidden w-[200px] md:inline-flex items-center pl-8 border-l-1 border-neutral-200 dark:border-neutral-800">
							<div>
								<p>Total Shopping</p>
								<p className="font-bold">
									{formattedTotalShoppingString}
								</p>
							</div>
						</div>
					</section>
					<div className="bottom flex justify-between items-end md:justify-end mt-2 md:mt-4">
						<div className="right total-shopping block flex-[0_0_41%] text-label-md md:hidden">
							<div className="px-1">
								<div className="inline">Total Shopping</div>
								<h4 className="font-bold">
									{formattedTotalShoppingString}
								</h4>
							</div>
						</div>
						<div>
							<div className="action-buttons flex items-center gap-2">
								{matches.medium ? (
									<OrderDetailsModal
										receiptNumber={receipt_number}
									/>
								) : null}
								<div className="upload-payment-proof-modal">
									<Button
										color="primary"
										size={matches.medium ? "md" : "sm"}
									>
										<span className="font-medium text-black">
											Upload payment proof
										</span>
									</Button>
								</div>
								<div className="cancel-order hidden md:block">
									<Button
										size={matches.medium ? "md" : "sm"}
										className="bg-red-600"
									>
										<span className="font-medium text-white">
											Cancel order
										</span>
									</Button>
								</div>
								{matches.medium ? null : (
									<Dropdown>
										<DropdownTrigger>
											<Button
												isIconOnly
												size="sm"
												variant="flat"
											>
												<IoEllipsisVertical />
											</Button>
										</DropdownTrigger>
										<DropdownMenu aria-label="Static Actions">
											<DropdownItem key="order_details">
												<Link
													to={`/order-details/${receipt_number}`}
												>
													<Button
														fullWidth
														size={
															matches.medium
																? "md"
																: "sm"
														}
														variant={
															matches.medium
																? "light"
																: "flat"
														}
													>
														<span className="font-medium text-primary-500">
															View Transaction
															Details
														</span>
													</Button>
												</Link>
											</DropdownItem>
											<DropdownItem key="cancel_order">
												<Button
													className="bg-red-600"
													size="sm"
													fullWidth
												>
													<span className="font-medium text-white">
														Cancel order
													</span>
												</Button>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								)}
							</div>
						</div>
					</div>
				</Card>
			)}
		</Media>
	);
};

export default OrderCard;
