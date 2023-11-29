import React, { useCallback, useEffect, useState } from "react";

import { Select, SelectItem } from "@nextui-org/react";
import Media from "react-media";
import { axiosInstance } from "../../../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckoutShipmentMethod = ({
	nearestWarehouseData,
	selectedUserAddressData,
	totalWeight,
	handleSelectedShippingCost,
}) => {
	const [shipmentServices, setShipmentServices] = useState([]);

	const navigate = useNavigate();

	const getShipmentCost = useCallback(async () => {
		try {
			if (selectedUserAddressData && totalWeight <= 30000) {
				const rajaOngkirQuery = {
					origin: nearestWarehouseData?.city_id,
					destination: selectedUserAddressData?.city?.id,
					weight: totalWeight,
					courier: "jne",
				};

				const resultRajaOngkirCost = await axiosInstance().post(
					"checkouts/cost",
					rajaOngkirQuery
				);

				setShipmentServices(resultRajaOngkirCost.data.data);
			} else if (selectedUserAddressData && totalWeight >= 30000) {
				toast.error(
					"Whoa, too much stuff! We can't handle more than 30kg. Please lighten your load."
				);
				navigate("/cart");
			}
		} catch (error) {
			console.log(error);
		}
	}, [selectedUserAddressData, nearestWarehouseData]);

	useEffect(() => {
		if (selectedUserAddressData && nearestWarehouseData) {
			getShipmentCost();
		}
	}, [selectedUserAddressData, nearestWarehouseData]);

	return (
		<section className="checkout-shipment-method p-4 my-4 md:bg-neutral-100 md:dark:bg-neutral-900 md:rounded-xl md:border-2 border-primary-100 dark:border-primary-900">
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
							items={shipmentServices}
							size={matches.medium ? "lg" : "md"}
							placeholder="Select duration"
							onChange={(e) =>
								handleSelectedShippingCost(e.target.value)
							}
							className="border-2 border-neutral-400 dark:border-none rounded-xl md:rounded-2xl"
						>
							{(shipmentService) => (
								<SelectItem
									key={shipmentService?.cost[0]?.value}
								>
									{`${shipmentService?.cost[0]?.value.toLocaleString(
										"id-ID",
										{
											style: "currency",
											currency: "IDR",
											minimumFractionDigits: 0,
											maximumFractionDigits: 0,
										}
									)} (estimasi tiba ${
										shipmentService?.cost[0]?.etd
									} hari) (${shipmentService?.service})`}
								</SelectItem>
							)}
						</Select>
					)}
				</Media>
			</div>
		</section>
	);
};

export default CheckoutShipmentMethod;
