import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../lib/axios";

import CheckoutSummaryOrder from "../../components/sections/user/CheckoutSummaryOrder";
import CheckoutOrderList from "../../components/sections/user/CheckoutOrderList";
import CheckoutAddress from "../../components/sections/user/CheckoutAddress";
import CheckoutShipmentMethod from "../../components/sections/user/CheckoutShipmentMethod";
import Footer from "../../components/layouts/shared/Footer";
import { useNavigate } from "react-router-dom";
import { onSetUserAddresses } from "../../redux/features/users";

const CheckoutPage = () => {
	const token = localStorage.getItem("accessToken");

	const { selectedItems } = useSelector((state) => state.carts);
	const { selectedUserAddressId } = useSelector((state) => state.user);

	const [selectedUserAddressData, setSelectedUserAddressData] = useState();
	const [selectedCheckoutProducts, setSelectedCheckoutProducts] = useState(
		[]
	);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [totalWeight, setTotalWeight] = useState(0);
	const [shippingCost, setShippingCost] = useState(0);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const fetchSelectedUserAddressData = useCallback(async () => {
		try {
			const { data } = await axiosInstance(token).get(
				`user-addresses/${selectedUserAddressId}`
			);

			setSelectedUserAddressData(data.data);
		} catch (error) {
			console.log(error);
		}
	}, [selectedUserAddressId]);

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
				?.map((item) => item?.quantity * item?.product?.weight)
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
		if (selectedUserAddressId) {
			fetchSelectedUserAddressData();
		}
	}, [selectedUserAddressId, fetchSelectedUserAddressData]);

	useEffect(() => {
		if (!selectedItems) {
			navigate("/cart");
		} else {
			getCheckoutDetail();
		}
	}, [selectedItems]);

	useEffect(() => {
		dispatch(onSetUserAddresses(token));
	}, []);

	return (
		<>
			<main className="checkout-page h-full pt-4 md:pb-20 md:max-w-[720px] md:mx-auto">
				<div className="page-heading mb-4 mx-4 md:mx-0">
					<h3 className="font-bold text-headline-sm">Checkout</h3>
				</div>
				<CheckoutAddress
					selectedUserAddressData={selectedUserAddressData}
				/>
				<CheckoutOrderList
					selectedCheckoutProducts={selectedCheckoutProducts}
				/>
				<CheckoutShipmentMethod
					totalWeight={totalWeight}
					handleSelectedShippingCost={handleSelectedShippingCost}
					selectedUserAddressData={selectedUserAddressData}
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
