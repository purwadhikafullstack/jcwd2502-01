import React from "react";

import { Button } from "@nextui-org/react";

const CheckoutSummaryOrder = () => {
	return (
		<>
			<section className="checkout-summary-order px-4 py-4 bg-neutral-100 dark:bg-neutral-900 md:rounded-xl">
				<h4 className="text-body-lg font-medium mb-2">
					Shopping summary
				</h4>
				<div className="checkout-summary-content">
					<p className="flex justify-between items-center text-label-lg md:text-body-lg">
						<span>Total Price {`(4 items)`}</span>
						<span className="font-bold">{`Rp. 5.098.000`}</span>
					</p>
					<p className="flex justify-between items-center text-label-lg md:text-body-lg">
						<span>Shipping cost</span>
						<span className="font-bold">{`Rp. 80.000`}</span>
					</p>
					<p className="flex justify-between items-center text-body-lg md:text-price-md py-2 my-2 border-y-1 border-neutral-200 dark:border-neutral-800">
						<span>Total transactions</span>
						<span className="font-bold">{`Rp. 5.178.000`}</span>
					</p>
				</div>
				<div className="checkout-pay md:pt-2">
					<Button size="lg" color="primary" fullWidth>
						<span className="font-bold text-black text-body-lg">
							Pay
						</span>
					</Button>
				</div>
			</section>
		</>
	);
};

export default CheckoutSummaryOrder;
