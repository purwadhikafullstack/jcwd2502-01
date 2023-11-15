import React, { useCallback, useEffect, useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Card,
	Image,
} from "@nextui-org/react";
import Media from "react-media";
import { orderStatuses } from "../../../data/constant";
import { axiosInstance } from "../../../lib/axios";

const OrderDetailsModal = ({ receiptNumber }) => {
	const token = localStorage.getItem("accessToken");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

	const onOpenModal = useCallback(() => {
		fetchOrderDetails();
		onOpen();
	}, [receiptNumber, orderDetails]);

	return (
		<Media
			queries={{
				medium: "(min-width: 768px)",
			}}
		>
			{(matches) => (
				<>
					<Button
						fullWidth
						size={matches.medium ? "md" : "sm"}
						variant={matches.medium ? "light" : "flat"}
						onPress={onOpenModal}
					>
						<span className="font-medium text-primary-600 dark:text-primary-500">
							View Transaction Details
						</span>
					</Button>
					<Modal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						scrollBehavior="inside"
						size={matches.medium ? "2xl" : "full"}
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">
										<span className="font-bold text-title-lg">
											Transaction Details
										</span>
									</ModalHeader>
									<ModalBody className="p-0">
										{orderDetails && (
											<>
												<section className="bg-neutral-100 dark:bg-[#202020] px-6 py-4">
													<h4 className="font-bold text-[18px] mb-2">
														{
															orderStatuses[
																Number(
																	orderDetails?.status
																) - 1
															].label
														}
													</h4>
													<div className="invoice flex justify-between items-center">
														<p>Invoice Number</p>
														<p>
															{
																orderDetails?.invoice
															}
														</p>
													</div>
													<div className="pd flex justify-between items-center">
														<p>Purchase Date</p>
														<p>
															{
																formattedDateString
															}
														</p>
													</div>
												</section>
												<section className="bg-neutral-100 dark:bg-[#202020] px-6 py-4">
													<h4 className="font-bold text-[18px] mb-2">
														Product Details
													</h4>
													<div className="flex flex-col gap-2">
														{orderDetails?.order_details?.map(
															(order_detail) => (
																<Card className="p-4">
																	<div className="flex items-center">
																		<div className="left w-full">
																			<div className="flex">
																				<div className="w-20 h-20">
																					<Image
																						src={`${
																							process
																								.env
																								.REACT_APP_IMAGE_API
																						}${order_detail?.product?.product_images[0]?.image.substring(
																							7
																						)}`}
																						// src={`${process.env.REACT_APP_IMAGE_API}1.png`}
																						alt="logitech"
																						className="w-full h-full aspect-square object-contain bg-white"
																					/>
																				</div>
																				<div className="w-[220px] ml-4">
																					<p className="font-bold line-clamp-3">
																						{
																							order_detail
																								?.product
																								?.product_name
																						}
																					</p>
																					<p>
																						{
																							order_detail?.quantity
																						}{" "}
																						x{" "}
																						{(order_detail?.product?.product_price).toLocaleString(
																							"id-ID",
																							{
																								style: "currency",
																								currency:
																									"IDR",
																								minimumFractionDigits: 0,
																								maximumFractionDigits: 0,
																							}
																						)}
																					</p>
																				</div>
																			</div>
																		</div>
																		<div className="right w-[200px]">
																			<div>
																				<p>
																					Total
																					Price
																				</p>
																				<p className="font-medium">
																					{(
																						order_detail
																							?.product
																							?.product_price *
																						order_detail?.quantity
																					).toLocaleString(
																						"id-ID",
																						{
																							style: "currency",
																							currency:
																								"IDR",
																							minimumFractionDigits: 0,
																							maximumFractionDigits: 0,
																						}
																					)}
																				</p>
																			</div>
																		</div>
																	</div>
																</Card>
															)
														)}
													</div>
												</section>
												<section className="bg-neutral-100 dark:bg-[#202020] px-6 py-4">
													<h4 className="font-bold text-[18px] mb-2">
														Shopping Info
													</h4>
													<div className="text-label-lg mb-2">
														<div className="pm flex justify-start items-start mb-2">
															<p className="w-[140px] block relative">
																Courier
															</p>
															<span className="mr-2">
																:
															</span>
															<p>JNE</p>
														</div>
														<div className="pm flex justify-start items-start mb-2">
															<p className="w-[140px] block relative">
																Receipt Number
															</p>
															<span className="mr-2">
																:
															</span>
															<p>
																{
																	orderDetails?.receipt_number
																}
															</p>
														</div>
														<div className="pm flex justify-start items-start mb-2">
															<p className="w-[140px] block relative">
																Address
															</p>
															<span className="mr-2">
																:
															</span>
															<div>
																<h6 className="font-bold">
																	{
																		orderDetails
																			?.user_address
																			?.address_name
																	}
																</h6>
																<p>
																	{
																		orderDetails
																			?.user_address
																			?.address
																	}
																	,{" "}
																	{
																		orderDetails
																			?.user_address
																			?.city
																			?.type
																	}{" "}
																	{
																		orderDetails
																			?.user_address
																			?.city
																			?.city_name
																	}
																	,{" "}
																	{
																		orderDetails
																			?.user_address
																			?.province
																			?.province
																	}
																	,{" "}
																	{
																		orderDetails
																			?.user_address
																			?.city
																			?.postal_code
																	}
																</p>
															</div>
														</div>
													</div>
												</section>
												<section className="bg-neutral-100 dark:bg-[#202020] px-6 py-4">
													<h4 className="font-bold text-[18px] mb-2">
														Payment Details
													</h4>
													<div className="text-label-lg mb-2 text-neutral-400">
														<div className="pm flex justify-between items-center">
															<p>
																Payment Method
															</p>
															<p>Bank Transfer</p>
														</div>
														<div className="pd flex justify-between items-center">
															<p>
																Total Price{" "}
																{`(${orderDetails?.total_item} Items)`}{" "}
															</p>
															<p>
																{orderDetails?.total_amount.toLocaleString(
																	"id-ID",
																	{
																		style: "currency",
																		currency:
																			"IDR",
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
																		currency:
																			"IDR",
																		minimumFractionDigits: 0,
																		maximumFractionDigits: 0,
																	}
																)}
															</p>
														</div>
													</div>
													<div className="pd font-bold flex justify-between items-center">
														<p className="">
															Total Shopping
														</p>
														<p>
															{(
																orderDetails?.total_amount +
																orderDetails?.shipping_cost
															).toLocaleString(
																"id-ID",
																{
																	style: "currency",
																	currency:
																		"IDR",
																	minimumFractionDigits: 0,
																	maximumFractionDigits: 0,
																}
															)}
														</p>
													</div>
												</section>
											</>
										)}
									</ModalBody>
									<ModalFooter>
										<Button
											variant="light"
											onPress={onClose}
										>
											Close
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</>
			)}
		</Media>
	);
};

export default OrderDetailsModal;
