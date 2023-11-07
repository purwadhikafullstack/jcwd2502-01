import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductDetailContent = () => {
	const [readMore, setReadMore] = useState(false);
	const [productPrice, setProductPrice] = useState(0);
	const productDetail = useSelector((state) => state.products.productDetail);

	useEffect(() => {
		if (productDetail) {
			setProductPrice(productDetail?.product_price);
		}
	}, [productDetail]);

	return (
		<section className="product-detail-content my-container md:w-full pt-4 md:pt-0">
			<div className="product-content mb-4">
				<h1 className="hidden md:inline-block product-title font-bold text-title-lg mb-2">
					{productDetail?.product_name}
				</h1>
				<div className="hidden md:flex gap-1 md:gap-2 my-2">
					<Chip className="chip md:px-2" color="secondary" size="sm">
						<p className="text-label-lg">{`Logitech`}</p>
					</Chip>
					<Chip className="chip md:px-2" color="secondary" size="sm">
						<p className="text-label-lg">{`Mouse`}</p>
					</Chip>
				</div>
				<h2 className="product-price font-bold text-price-md md:text-price-lg mb-2">
					{productPrice &&
						productPrice.toLocaleString("id-ID", {
							style: "currency",
							currency: "IDR",
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						})}
				</h2>
				<div className="flex md:hidden gap-1 md:gap-2 my-2">
					<Chip className="chip md:px-2" color="secondary" size="sm">
						<p className="text-[12px]">{`Logitech`}</p>
					</Chip>
					<Chip className="chip md:px-2" color="secondary" size="sm">
						<p className="text-[12px]">{`Mouse`}</p>
					</Chip>
				</div>
				<h1 className="md:hidden product-title font-normal text-body-lg line-clamp-2">
					{productDetail?.product_name}
				</h1>
			</div>
			<div className="product-detail w-full">
				<div className="product-detail-container w-full">
					<Tabs aria-label="ProductDetail" className="w-full">
						<Tab key="description" title="Description">
							<Card>
								<CardBody>
									<span
										className={`${
											readMore ? "" : "line-clamp-4"
										}`}
									>
										{productDetail?.product_desc}
									</span>
									<button
										onClick={() => setReadMore(!readMore)}
										className="text-left mt-4 font-medium text-primary-600 dark:text-primary-500"
									>
										{readMore ? "Show less" : "Show more"}
									</button>
								</CardBody>
							</Card>
						</Tab>
						<Tab key="specification" title="Specification">
							<Card>
								<CardBody className="py-2">
									{productDetail?.specification && (
										<div className="specs-wrapper flex flex-col divide-y-1 w-full">
											<div className="physical-specs py-2 w-full">
												<h4 className="font-medium mb-1">
													Physical Specification
												</h4>
												<div className="list">
													<div className="height">
														{productDetail
															?.specification
															.height &&
															`Height: ${productDetail?.specification.height}`}
													</div>
													<div className="width">
														{productDetail
															?.specification
															.width &&
															`Width: ${productDetail?.specification.width}`}
													</div>
													<div className="thickness">
														{productDetail
															?.specification
															.thickness &&
															`Thickness: ${productDetail?.specification.thickness}`}
													</div>
													<div className="weight">
														{productDetail
															?.specification
															.weight &&
															`Weight: ${productDetail?.specification.weight}`}
													</div>
												</div>
											</div>
											{productDetail?.category
												?.category_type !==
												"Mousepad" && (
												<div className="tracking-specs py-2">
													<h4 className="font-medium mb-1">
														Specifications
													</h4>
													<div className="list">
														<div className="sensor">
															{productDetail
																?.specification
																.sensor &&
																`Sensor: ${productDetail?.specification.sensor}`}
														</div>
														<div className="resolution">
															{productDetail
																?.specification
																.resolution &&
																`Resolution: ${productDetail?.specification.resolution}`}
														</div>
														<div className="wireless">
															{productDetail
																?.specification
																.wireless &&
																`Wireless`}
														</div>
														<div className="wired">
															{productDetail
																?.specification
																.wired &&
																`Cable length: ${productDetail?.specification.wired}`}
														</div>
														<div className="battery capitalize">
															{productDetail
																?.specification
																.battery_life &&
																`Battery life: ${
																	productDetail
																		?.specification
																		.battery_life
																} ${
																	productDetail
																		?.specification
																		.battery_life ===
																	"rechargeable"
																		? ""
																		: "hour"
																}`}
														</div>
													</div>
												</div>
											)}
											<div className="warranty-specs py-2">
												<h4 className="font-medium mb-1">
													Warranty
												</h4>
												<div className="list">
													{
														productDetail
															?.specification
															.warranty
													}
													-Year(s)
												</div>
											</div>
										</div>
									)}
								</CardBody>
							</Card>
						</Tab>
					</Tabs>
				</div>
			</div>
		</section>
	);
};

export default ProductDetailContent;
