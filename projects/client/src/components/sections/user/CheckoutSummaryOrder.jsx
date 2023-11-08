import React from "react";

import { Button } from "@nextui-org/react";
import CheckoutPaymentModal from "../../layouts/user/CheckoutPaymentModal";

const CheckoutSummaryOrder = ({ totalPrice, totalQuantity, shippingCost }) => {
	const totalPriceString = Number(totalPrice).toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const shippingCostString = Number(shippingCost).toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const totalTransactionString = (
		Number(totalPrice) + Number(shippingCost)
	).toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	return (
		<section className="checkout-summary-order px-4 py-4 bg-neutral-100 dark:bg-neutral-900 md:rounded-xl md:border-2 border-primary-100 dark:border-primary-900">
			<h4 className="text-body-lg font-medium mb-2">Shopping summary</h4>
			<div className="checkout-summary-content">
				<p className="flex justify-between items-center text-label-lg md:text-body-lg">
					<span>Total Price {`(${totalQuantity} items)`}</span>
					<span className="font-bold">{totalPriceString}</span>
				</p>
				<p className="flex justify-between items-center text-label-lg md:text-body-lg">
					<span>Shipping cost</span>
					<span className="font-bold">{shippingCostString}</span>
				</p>
				<p className="flex justify-between items-center text-body-lg md:text-price-md py-2 my-2 border-y-1 border-neutral-200 dark:border-neutral-800">
					<span>Total transactions</span>
					<span className="font-bold">{totalTransactionString}</span>
				</p>
			</div>
			<div className="checkout-pay pb-4 md:pt-2 md:pb-0">
				<CheckoutPaymentModal
					shippingCost={shippingCostString}
					totalPrice={totalPriceString}
					totalQuantity={totalQuantity}
					totalTransaction={totalTransactionString}
				/>
			</div>
		</section>
	);
};

export default CheckoutSummaryOrder;
