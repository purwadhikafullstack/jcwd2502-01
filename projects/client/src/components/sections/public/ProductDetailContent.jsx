import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";

const ProductDetailContent = () => {
	const [readMore, setReadMore] = useState(false);

	return (
		<>
			<section className="product-detail-content my-container pt-4 md:pt-0">
				<div className="product-content mb-4">
					<h1 className="hidden md:inline-block product-title font-bold text-title-lg mb-2">
						PRO X SUPERLIGHT 2 LIGHTSPEED Wireless Gaming Mouse
					</h1>
					<div className="hidden md:flex gap-1 md:gap-2 my-2">
						<Chip
							className="chip md:px-2"
							color="secondary"
							size="sm"
						>
							<p className="text-label-lg">{`Logitech`}</p>
						</Chip>
						<Chip
							className="chip md:px-2"
							color="secondary"
							size="sm"
						>
							<p className="text-label-lg">{`Mouse`}</p>
						</Chip>
					</div>
					<h2 className="product-price font-bold text-price-md md:text-price-lg mb-2">
						Rp. 1.990.000
					</h2>
					<div className="flex md:hidden gap-1 md:gap-2 my-2">
						<Chip
							className="chip md:px-2"
							color="secondary"
							size="sm"
						>
							<p className="text-[12px]">{`Logitech`}</p>
						</Chip>
						<Chip
							className="chip md:px-2"
							color="secondary"
							size="sm"
						>
							<p className="text-[12px]">{`Mouse`}</p>
						</Chip>
					</div>
					<h1 className="md:hidden product-title font-normal text-body-lg line-clamp-2">
						PRO X SUPERLIGHT 2 LIGHTSPEED Wireless Gaming Mouse
					</h1>
				</div>
				<div className="product-detail">
					<div className="product-detail-container">
						<Tabs aria-label="ProductDetail">
							<Tab key="description" title="Description">
								<Card>
									<CardBody>
										<span
											className={`${
												readMore ? "" : "line-clamp-4"
											}`}
										>
											The next evolution of our champion
											mouse. Welcome the new weapon of
											choice for the world's top esports
											athletes. Tenkeyless design inspired
											by pro players LIGHTSYNC RGB
											lighting Advanced features require
											Logitech G HUB software. Download at
											LogitechG.com/GHUB Onboard lighting
											profile 2Advanced features require
											Logitech G HUB software. Download at
											LogitechG.com/GHUB 6ft detachable
											data and charging cable Report rate
											1 ms. PACKAGING CONTENTS PRO X
											SUPERLIGHT 2 Wireless Gaming Mouse
											LIGHTSPEED USB Adapter USB A to C
											data/charging cable Adapter
											extension Optional grip tape
											Optional aperture door with PTFE
											backing User documentation.
										</span>
										<button
											onClick={() =>
												setReadMore(!readMore)
											}
											className="text-left mt-4 font-medium text-primary-600 dark:text-primary-500"
										>
											{readMore
												? "Show less"
												: "Show more"}
										</button>
									</CardBody>
								</Card>
							</Tab>
							<Tab key="specification" title="Specification">
								<Card>
									<CardBody className="py-2">
										<div className="specs-wrapper flex flex-col divide-y-1">
											<div className="physical-specs py-2">
												<h4 className="font-medium mb-1">
													Physical Specification
												</h4>
												<div className="list">
													<div className="height">
														Height: {"125.0 mm"}
													</div>
													<div className="width">
														Width: {"63.5 mm"}
													</div>
													<div className="thickness">
														Thickness: {"40.0 mm"}
													</div>
													<div className="weight">
														Weight: {"60.0 g"}
													</div>
												</div>
											</div>
											<div className="tracking-specs py-2">
												<h4 className="font-medium mb-1">
													Tracking
												</h4>
												<div className="list">
													<div className="sensor">
														Sensor: {"HERO 2"}
													</div>
													<div className="resolution">
														Resolution:{" "}
														{"100 - 32.000 dpi"}
													</div>
												</div>
											</div>
											<div className="warranty-specs py-2">
												<h4 className="font-medium mb-1">
													Warranty
												</h4>
												<div className="list">
													{"2"}-Year(s)
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</Tab>
						</Tabs>
					</div>
				</div>
			</section>
		</>
	);
};

export default ProductDetailContent;
