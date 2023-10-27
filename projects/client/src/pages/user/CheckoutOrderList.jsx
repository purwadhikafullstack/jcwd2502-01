import React from "react";
import CheckoutProductCard from "../../components/uis/Cards/CheckoutProductCard";

const CheckoutOrderList = () => {
	return (
		<>
			<section className="checkout-order-list px-4 md:p-4 md:my-4 flex flex-col gap-2 md:rounded-xl md:bg-neutral-100 md:dark:bg-neutral-900">
				<CheckoutProductCard />
				<CheckoutProductCard />
				<CheckoutProductCard />
				<CheckoutProductCard />
			</section>
		</>
	);
};

export default CheckoutOrderList;
