import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../lib/axios";

import CheckoutSummaryOrder from "../../components/sections/user/CheckoutSummaryOrder";
import CheckoutOrderList from "../../components/sections/user/CheckoutOrderList";
import CheckoutAddress from "../../components/sections/user/CheckoutAddress";
import CheckoutShipmentMethod from "../../components/sections/user/CheckoutShipmentMethod";
import Footer from "../../components/layouts/shared/Footer";

const CheckoutPage = () => {
	const [selectedUserAddress, setSelectedUserAddress] = useState();

	const { user_address } = useSelector((state) => state.user);

	const fetchSelectedUserAddress = useCallback(async () => {
		try {
			const { data } = await axiosInstance().get(
				`user-addresses/${1}?address_id=${user_address}`
			);

			setSelectedUserAddress(data.data);
		} catch (error) {
			console.log(error);
		}
	}, [user_address]);

	useEffect(() => {
		if (user_address) {
			fetchSelectedUserAddress();
		}
	}, [user_address]);

	return (
		<>
			<main className="checkout-page h-full pt-4 md:pb-20 md:max-w-[720px] md:mx-auto">
				<div className="page-heading mb-4 mx-4 md:mx-0">
					<h3 className="font-bold text-headline-sm">Checkout</h3>
				</div>
				<CheckoutAddress selectedUserAddress={selectedUserAddress} />
				<CheckoutOrderList />
				<CheckoutShipmentMethod
					selectedUserAddress={selectedUserAddress}
				/>
				<CheckoutSummaryOrder />
			</main>
			<footer className="hidden md:block">
				<Footer />
			</footer>
		</>
	);
};

export default CheckoutPage;
