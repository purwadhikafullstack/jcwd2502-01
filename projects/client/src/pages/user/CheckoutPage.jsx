import React from "react";

import Footer from "../../components/layouts/shared/Footer";
import CheckoutSummaryOrder from "../../components/sections/user/CheckoutSummaryOrder";
import CheckoutShipmentMethod from "./CheckoutShipmentMethod";
import CheckoutOrderList from "./CheckoutOrderList";
import CheckoutAddress from "./CheckoutAddress";

const CheckoutPage = () => {
	return (
		<>
			<main className="checkout-page h-full pt-4 md:pb-20 md:max-w-[720px] md:mx-auto">
				<div className="page-heading mb-4 mx-4 md:mx-0">
					<h3 className="font-bold text-headline-sm">Checkout</h3>
				</div>
				<CheckoutAddress />
				<CheckoutOrderList />
				<CheckoutShipmentMethod />
				<CheckoutSummaryOrder />
			</main>
			<footer className="hidden md:block">
				<Footer />
			</footer>
		</>
	);
};

export default CheckoutPage;
