import React from "react";

import { Select, SelectItem } from "@nextui-org/react";
import Media from "react-media";

const CheckoutShipmentMethod = () => {
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
								<SelectItem key={1} value={"OKE"}>
									{`Rp. 18.000 (estimasi tiba 2-3 hari) (OKE)`}
								</SelectItem>
								<SelectItem key={2} value={"REG"}>
									{`Rp. 26.000 (estimasi tiba 2-3 hari) (REG)`}
								</SelectItem>
								<SelectItem key={3} value={"YES"}>
									{`Rp. 37.000 (estimasi tiba 2-3 hari) (YES)`}
								</SelectItem>
							</Select>
						)}
					</Media>
				</div>
			</section>
		</>
	);
};

export default CheckoutShipmentMethod;
