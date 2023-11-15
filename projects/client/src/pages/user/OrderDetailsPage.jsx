import React, { useEffect, useState } from "react";
import { Card, Image } from "@nextui-org/react";
import { orderStatuses } from "../../data/constant";
import { axiosInstance } from "../../lib/axios";
import { useParams } from "react-router-dom";

const OrderDetailsPage = () => {
	const token = localStorage.getItem("accessToken");
	const { receiptNumber } = useParams();

	const [orderDetails, setOrderDetails] = useState();

	const fetchOrderDetails = async () => {
		try {
			const { data } = await axiosInstance(token).get(
				`orders/${receiptNumber}`
			);

			setOrderDetails(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const date = new Date(orderDetails?.createdAt);

	const optionsDate = {
		day: "numeric",
		month: "short",
		year: "numeric",
	};

	const optionsTime = {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone: "Asia/Jakarta", // Set the time zone to WIB
	};

	const formattedDateString = `${date.toLocaleDateString(
		"en-GB",
		optionsDate
	)}, ${date.toLocaleTimeString("en-US", optionsTime)} WIB`;

	useEffect(() => {
		fetchOrderDetails();
	}, [receiptNumber]);

	return (
		<div className="flex flex-col gap-3">
			<section className="bg-neutral-100 dark:bg-[#202020] p-4">
				{orderDetails && (
					<h4 className="font-bold text-base mb-2">
						{orderStatuses[Number(orderDetails?.status) - 1].label}
					</h4>
				)}
				<div className="invoice text-label-lg flex justify-between items-center">
					<p>Invoice Number</p>
					<p>{orderDetails?.invoice}</p>
				</div>
				<div className="pd text-label-lg flex justify-between items-center">
					<p>Purchase Date</p>
					<p>{formattedDateString}</p>
				</div>
			</section>
			<section className="bg-neutral-100 dark:bg-[#202020] p-4">
				<h4 className="font-bold text-base mb-2">Product Details</h4>
				<div className="flex flex-col gap-2">
					{orderDetails?.order_details?.map((order_detail) => (
						<Card className="p-4">
							<div className="flex justify-between items-center">
								<div className="left w-[calc(100% - 100px)]">
									<div className="flex">
										<div className="w-[64px] h-[64px]">
											<Image
												src={`${
													process.env
														.REACT_APP_IMAGE_API
												}${order_detail?.product?.product_images[0]?.image.substring(
													7
												)}`}
												// src={`${process.env.REACT_APP_IMAGE_API}1.png`}
												alt="logitech"
												className="w-full h-full aspect-square object-contain bg-white"
											/>
										</div>
										<div className="w-[140px] ml-4 text-body-md">
											<p className="font-bold line-clamp-2">
												{
													order_detail?.product
														?.product_name
												}
											</p>
											<p>
												{order_detail?.quantity} x{" "}
												{(order_detail?.product?.product_price).toLocaleString(
													"id-ID",
													{
														style: "currency",
														currency: "IDR",
														minimumFractionDigits: 0,
														maximumFractionDigits: 0,
													}
												)}
											</p>
										</div>
									</div>
								</div>
								<div className="right w-[100px] pl-4">
									<div className="text-label-md">
										<p>Total Price</p>
										<p className="font-medium">
											{(
												order_detail?.product
													?.product_price *
												order_detail?.quantity
											).toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
												minimumFractionDigits: 0,
												maximumFractionDigits: 0,
											})}
										</p>
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>
			</section>
			<section className="bg-neutral-100 dark:bg-[#202020] p-4">
				<h4 className="font-bold text-base mb-2">Shopping Info</h4>
				<div className="text-label-md mb-2">
					<div>
						<div className="pm flex justify-start items-start mb-2">
							<p className="w-1/3 block relative">Courier</p>
							<p>JNE</p>
						</div>
					</div>
					<div>
						<div className="pm flex justify-start items-start mb-2">
							<p className="w-1/3 block relative">
								Receipt Number
							</p>
							<p>{orderDetails?.receipt_number}</p>
						</div>
					</div>
					<div>
						<div className="pm flex justify-start items-start mb-2">
							<p className="w-1/3 block relative">Address</p>
							<div className="block w-2/3">
								<h6 className="font-bold">
									{orderDetails?.user_address?.address_name}
								</h6>
								<p className="flex flex-wrap">
									{orderDetails?.user_address?.address},{" "}
									{orderDetails?.user_address?.city?.type}{" "}
									{
										orderDetails?.user_address?.city
											?.city_name
									}
									,{" "}
									{
										orderDetails?.user_address?.province
											?.province
									}
									,{" "}
									{
										orderDetails?.user_address?.city
											?.postal_code
									}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-neutral-100 dark:bg-[#202020] p-4">
				<h4 className="font-bold text-base mb-2">Payment Details</h4>
				<div className="text-label-lg mb-2 text-neutral-400">
					<div className="pm flex justify-between items-center">
						<p>Payment Method</p>
						<p>Bank Transfer</p>
					</div>
					<div className="pd flex justify-between items-center">
						<p>
							Total Price {`(${orderDetails?.total_item} Items)`}{" "}
						</p>
						<p>
							{orderDetails?.total_amount.toLocaleString(
								"id-ID",
								{
									style: "currency",
									currency: "IDR",
									minimumFractionDigits: 0,
									maximumFractionDigits: 0,
								}
							)}
						</p>
					</div>
					<div className="pd flex justify-between items-center">
						<p>Shipping Cost</p>
						<p>
							{orderDetails?.shipping_cost.toLocaleString(
								"id-ID",
								{
									style: "currency",
									currency: "IDR",
									minimumFractionDigits: 0,
									maximumFractionDigits: 0,
								}
							)}
						</p>
					</div>
				</div>
				<div className="pd font-bold flex justify-between items-center">
					<p className="">Total Shopping</p>
					<p>
						{(
							orderDetails?.total_amount +
							orderDetails?.shipping_cost
						).toLocaleString("id-ID", {
							style: "currency",
							currency: "IDR",
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						})}
					</p>
				</div>
			</section>
		</div>
	);
};

export default OrderDetailsPage;
