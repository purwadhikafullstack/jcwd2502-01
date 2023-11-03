import React from "react";
import CheckoutProductCard from "../../uis/Cards/CheckoutProductCard";

const CheckoutOrderList = ({ selectedCheckoutProducts }) => {
	return (
		<section className="checkout-order-list px-4 md:p-4 md:my-4 flex flex-col gap-2 md:rounded-xl md:bg-neutral-100 md:dark:bg-neutral-900">
			{selectedCheckoutProducts?.map((selectedCheckoutProduct) => {
				return (
					<CheckoutProductCard
						checkedoutProductData={selectedCheckoutProduct}
					/>
				);
			})}
		</section>
	);
};

export default CheckoutOrderList;
