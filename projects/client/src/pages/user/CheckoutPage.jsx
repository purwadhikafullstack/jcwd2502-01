import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

import CheckoutAddress from "../../components/sections/user/CheckoutAddress";
import CheckoutOrderList from "../../components/sections/user/CheckoutOrderList";
import CheckoutShipmentMethod from "../../components/sections/user/CheckoutShipmentMethod";
import CheckoutSummaryOrder from "../../components/sections/user/CheckoutSummaryOrder";
import Footer from "../../components/layouts/shared/Footer";
import { onSetUserAddresses } from "../../redux/features/users";

const CheckoutPage = () => {
	const token = localStorage.getItem("accessToken");

	const { selectedItems } = useSelector((state) => state.carts);
	const { selectedUserAddressId } = useSelector((state) => state.user);

	const [selectedUserAddressData, setSelectedUserAddressData] =
		useState(null);
	const [nearestWarehouseData, setNearestWarehouseData] = useState(null);
	const [selectedCheckoutProducts, setSelectedCheckoutProducts] = useState(
		[]
	);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [totalWeight, setTotalWeight] = useState(0);
	const [shippingCost, setShippingCost] = useState(0);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const resetShippingCost = () => {
		setShippingCost(0);
	};

	const fetchOriginAndDestination = useCallback(async () => {
		try {
			const selectedUserAddress = await axiosInstance(token).get(
				`user-addresses/${selectedUserAddressId}`
			);

			const nearestWarehouse = await axiosInstance(token).get(
				`checkouts/nearest-warehouse/${selectedUserAddressId}`
			);

			setSelectedUserAddressData(selectedUserAddress.data.data);
			setNearestWarehouseData(nearestWarehouse.data.data);
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

			const totalDetails = data.data?.reduce(
				(acc, item) => {
					const quantity = item.quantity;
					const product = item.product;
					const productPrice = product.product_price;
					const weight = product.weight;

					acc.totalQuantity += quantity;
					acc.totalPrice += quantity * productPrice;
					acc.totalWeight += quantity * weight;

					return acc;
				},
				{
					totalQuantity: 0,
					totalPrice: 0,
					totalWeight: 0,
				}
			);

			setTotalQuantity(totalDetails.totalQuantity);
			setTotalPrice(totalDetails.totalPrice);
			setTotalWeight(totalDetails.totalWeight);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleSelectedShippingCost = (shippingCost) => {
		setShippingCost(shippingCost);
	};

	useEffect(() => {
		dispatch(onSetUserAddresses(token));
		window.scrollTo({ top: 0 });
	}, []);

	useEffect(() => {
		if (selectedUserAddressId) {
			fetchOriginAndDestination();
		}
	}, [selectedUserAddressId, fetchOriginAndDestination]);

	useEffect(() => {
		if (!selectedItems) {
			navigate("/cart");
		} else {
			getCheckoutDetail();
		}
	}, [selectedItems, getCheckoutDetail, navigate]);

	return (
		<main className="checkout-page h-full pt-4 md:pb-20	md:w-[1080px] md:mx-auto">
			<div className="md:flex md:justify-between md:relative">
				<div className="md:w-[694px] md:mr-8">
					<div className="page-heading mb-4 mx-4 md:mx-0">
						<h3 className="font-bold text-headline-sm">Checkout</h3>
					</div>
					<CheckoutAddress
						selectedUserAddressData={selectedUserAddressData}
						resetShippingCost={resetShippingCost}
					/>
					<CheckoutOrderList
						selectedCheckoutProducts={selectedCheckoutProducts}
					/>
				</div>
				<div className="md:w-[380px] md:relative">
					<div className="md:relative">
						<div className="md:fixed md:w-[380px]">
							<div>
								<CheckoutShipmentMethod
									totalWeight={totalWeight}
									nearestWarehouseData={nearestWarehouseData}
									handleSelectedShippingCost={
										handleSelectedShippingCost
									}
									selectedUserAddressData={
										selectedUserAddressData
									}
								/>
								<CheckoutSummaryOrder
									totalPrice={totalPrice}
									totalQuantity={totalQuantity}
									shippingCost={shippingCost}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CheckoutPage;
