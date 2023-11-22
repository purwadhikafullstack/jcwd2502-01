import React from "react";
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
	Tooltip,
} from "@nextui-org/react";
import Media from "react-media";
import { orderStatuses } from "../../../data/constant";
import { FaRegEye } from "react-icons/fa6";
import PaymentProofModal from "../../uis/Modals/PaymentProofModal";

const AdminViewOrderDetailsModal = ({ orderDetailsData }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const date = new Date(orderDetailsData?.createdAt);

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

	return (
		<Media
			queries={{
				medium: "(min-width: 768px)",
			}}
		>
			{(matches) => (
				<>
					<Tooltip content="View Details">
						<Button
							// isIconOnly
							variant="faded"
							color="default"
							onPress={onOpen}
							startContent={<FaRegEye size={18} />}
						>
							Review Order
						</Button>
					</Tooltip>
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
										<span className="font-bold text-lg">
											Transaction Details
										</span>
									</ModalHeader>
									<ModalBody className="p-0">
										{orderDetailsData && (
											<>
												<section className="bg-neutral-100 dark:bg-[#202020] px-6 py-4">
													<h4 className="font-bold text-[18px] mb-2">
														{
															orderStatuses[
																Number(
																	orderDetailsData?.status
																) - 1
															].label
														}
													</h4>
													<div className="invoice flex justify-between items-center">
														<p>Invoice Number</p>
														<p>
															{
																orderDetailsData?.invoice
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
														{orderDetailsData?.order_details?.map(
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
																	orderDetailsData?.receipt_number
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
																		orderDetailsData
																			?.user_address
																			?.address_name
																	}
																</h6>
																<p>
																	{
																		orderDetailsData
																			?.user_address
																			?.address
																	}
																	,{" "}
																	{
																		orderDetailsData
																			?.user_address
																			?.city
																			?.type
																	}{" "}
																	{
																		orderDetailsData
																			?.user_address
																			?.city
																			?.city_name
																	}
																	,{" "}
																	{
																		orderDetailsData
																			?.user_address
																			?.province
																			?.province
																	}
																	,{" "}
																	{
																		orderDetailsData
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
																{`(${orderDetailsData?.total_item} Items)`}{" "}
															</p>
															<p>
																{orderDetailsData?.total_amount.toLocaleString(
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
																{orderDetailsData?.shipping_cost.toLocaleString(
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
																orderDetailsData?.total_amount +
																orderDetailsData?.shipping_cost
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
													<div className="pt-4 w-full">
														<PaymentProofModal
															imageSource={
																orderDetailsData?.proof_of_payment
															}
														/>
													</div>
												</section>
											</>
										)}
									</ModalBody>
									<ModalFooter className="flex justify-center">
										<Button
											fullWidth
											onPress={onClose}
											className="bg-red-600"
										>
											<span className="font-medium text-white">
												Cancel Order
											</span>
										</Button>
										<Button
											fullWidth
											onPress={onClose}
											className="bg-red-600"
										>
											<span className="font-medium text-white">
												Reject Order
											</span>
										</Button>
										<Button
											fullWidth
											onPress={onClose}
											className="bg-primary-500"
										>
											<span className="font-medium text-black">
												Accept Order
											</span>
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

export default AdminViewOrderDetailsModal;
