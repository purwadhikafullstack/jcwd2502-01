import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../lib/axios";

import CheckoutSummaryOrder from "../../components/sections/user/CheckoutSummaryOrder";
import CheckoutOrderList from "../../components/sections/user/CheckoutOrderList";
import CheckoutAddress from "../../components/sections/user/CheckoutAddress";
import CheckoutShipmentMethod from "../../components/sections/user/CheckoutShipmentMethod";
import Footer from "../../components/layouts/shared/Footer";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
	const token = localStorage.getItem("accessToken");
	const { selectedItems } = useSelector((state) => state.carts);

	const [selectedUserAddress, setSelectedUserAddress] = useState();
	const [selectedCheckoutProducts, setSelectedCheckoutProducts] = useState(
		[]
	);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [totalWeight, setTotalWeight] = useState(0);
	const [shippingCost, setShippingCost] = useState(0);

	const { user_address } = useSelector((state) => state.user);

	const navigate = useNavigate();

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

	const getCheckoutDetail = useCallback(async () => {
		try {
			const { data } = await axiosInstance(token).get(
				`checkouts/selected-products`
			);

			setSelectedCheckoutProducts(data.data);

			const sumTotalQty = data.data
				?.map((item) => item?.quantity)
				.reduce((a, b) => a + b, 0);

			setTotalQuantity(sumTotalQty);

			const sumTotalPrice = data.data
				?.map((item) => item?.quantity * item?.product.product_price)
				.reduce((a, b) => a + b, 0);

			setTotalPrice(sumTotalPrice);

			const sumTotalWeight = data.data
				?.map(
					(item) =>
						item?.quantity * item?.product?.specification.weight
				)
				.reduce((a, b) => a + b, 0);

			setTotalWeight(sumTotalWeight);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleSelectedShippingCost = (shippingCost) => {
		setShippingCost(shippingCost);
	};

	useEffect(() => {
		if (user_address) {
			fetchSelectedUserAddress();
		}
	}, [user_address, fetchSelectedUserAddress]);

	useEffect(() => {
		if (!selectedItems) {
			navigate("/cart");
		} else {
			getCheckoutDetail();
		}
	}, [selectedItems]);

	return (
		<>
			<main className="checkout-page h-full pt-4 md:pb-20 md:max-w-[720px] md:mx-auto">
				<div className="page-heading mb-4 mx-4 md:mx-0">
					<h3 className="font-bold text-headline-sm">Checkout</h3>
				</div>
				<CheckoutAddress selectedUserAddress={selectedUserAddress} />
				<CheckoutOrderList
					selectedCheckoutProducts={selectedCheckoutProducts}
				/>
				<CheckoutShipmentMethod
					handleSelectedShippingCost={handleSelectedShippingCost}
					selectedUserAddress={selectedUserAddress}
				/>
				<CheckoutSummaryOrder
					totalPrice={totalPrice}
					totalQuantity={totalQuantity}
					shippingCost={shippingCost}
				/>
			</main>
			<footer className="hidden md:block">
				<Footer />
			</footer>
		</>
	);
};

export default CheckoutPage;
