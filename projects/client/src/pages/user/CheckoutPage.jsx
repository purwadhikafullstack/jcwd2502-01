import React, { useCallback, useEffect, useState } from "react";

import Footer from "../../components/layouts/shared/Footer";
import CheckoutSummaryOrder from "../../components/sections/user/CheckoutSummaryOrder";
import CheckoutShipmentMethod from "./CheckoutShipmentMethod";
import CheckoutOrderList from "./CheckoutOrderList";
import CheckoutAddress from "./CheckoutAddress";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../lib/axios";

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
