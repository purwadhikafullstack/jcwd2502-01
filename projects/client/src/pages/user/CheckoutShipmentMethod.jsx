import React, { useCallback, useEffect, useState } from "react";

import { Select, SelectItem } from "@nextui-org/react";
import Media from "react-media";
import { axiosInstance } from "../../lib/axios";

const CheckoutShipmentMethod = ({ selectedUserAddress }) => {
	const [shipmentServices, setShipmentServices] = useState([]);

	const getShipmentCost = useCallback(async () => {
		try {
			const rajaOngkirQuery = {
				origin: "152",
				destination: selectedUserAddress?.city?.id,
				weight: 1200,
				courier: "jne",
			};

			const resultRajaOngkirCost = await axiosInstance().post(
				"checkouts/cost",
				rajaOngkirQuery
			);

			setShipmentServices(resultRajaOngkirCost.data.data);
		} catch (error) {
			console.log(error);
		}
	}, [selectedUserAddress]);

	useEffect(() => {
		getShipmentCost();
	}, [selectedUserAddress, getShipmentCost]);

	return (
		<>
			<section className="checkout-shipment-method p-4 my-4 md:bg-neutral-100 md:dark:bg-neutral-900 md:rounded-xl">
				<div className="select-shipment-method">
					<h5 className="mb-2 text-body-lg font-medium">
						Select Shipment Method
					</h5>
					<Media
						queries={{
							medium: "(min-width: 768px)",
						}}
					>
						{(matches) => (
							<Select
								size={matches.medium ? "lg" : "md"}
								placeholder="Select duration"
								className="border-2 border-neutral-400 dark:border-none rounded-xl md:rounded-2xl"
							>
								{shipmentServices?.map((service) => {
									return (
										<SelectItem
											key={service?.cost[0]?.value}
										>
											{`${service?.cost[0]?.value.toLocaleString(
												"id-ID",
												{
													style: "currency",
													currency: "IDR",
													minimumFractionDigits: 0,
													maximumFractionDigits: 0,
												}
											)} (estimasi tiba ${
												service?.cost[0]?.etd
											} hari) (${service?.service})`}
										</SelectItem>
									);
								})}
							</Select>
						)}
					</Media>
				</div>
			</section>
		</>
	);
};

export default CheckoutShipmentMethod;
