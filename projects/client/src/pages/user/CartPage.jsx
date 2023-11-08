import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";

import ProductCartCard from "../../components/uis/Cards/ProductCartCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAsync } from "../../redux/features/carts";
import EmptyCartSVG from "../../assets/illustrations/EmptyCartSVG";
import Footer from "../../components/layouts/shared/Footer";

const CartPage = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const token = localStorage.getItem("accessToken");

	const { carts, totalPrice, totalWeight, selectedItems } = useSelector(
		(state) => state.carts
	);

	const idrTotalPrice = Number(totalPrice)?.toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleGoToCheckout = () => {
		if (totalWeight <= 30000) {
			navigate("/cart/checkout");
		} else {
			onOpen();
		}
	};

	useEffect(() => {
		dispatch(fetchCartAsync(token));
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<>
			<main className="cart-page max-w-full min-h-screen mx-[16px] md:max-w-[1120px] md:min-h-[90vh] md:mx-auto py-4 pb-44 md:pb-24">
				<div className="page-heading mb-4">
					<h3 className="font-bold text-headline-sm">Cart</h3>
				</div>
				<div className="page-body md:grid md:grid-cols-6">
					<div className="product-cart-list w-full col-span-4 z-0">
						{carts.length ? (
							<div className="product-cart-list-wrapper">
								<div>
									{carts?.map((cart) => {
										return (
											<ProductCartCard dataCart={cart} />
										);
									})}
								</div>
							</div>
						) : (
							<div className="empty-cart flex flex-col items-center justify-center py-8">
								<div className="ml-8">
									<EmptyCartSVG
										className={"scale-80 md:scale-100"}
									/>
								</div>
								<h5 className="text-title-md md:text-title-lg font-medium mt-0 mb-4 md:mt-8 md:mb-6">
									Oh no, your cart's empty!
								</h5>
								<Link to={"/explore"}>
									<Button
										color="primary"
										className="animate-pulse"
									>
										<span className="font-medium text-black">
											Explore Products
										</span>
									</Button>
								</Link>
							</div>
						)}
					</div>
					<div className="cart-action col-span-2">
						<div className="cart-action-card md:col-span-2 md:ml-12 w-full md:w-[360px] md:fixed">
							<div className="bg-background md:rounded-lg fixed bottom-0 left-0 right-0 md:sticky md:top-[140px] md:bottom-auto shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)] z-10 md:border-2 border-primary-100 dark:border-primary-900">
								<div className="flex flex-col p-6 pb-10 md:p-6 text-neutral-700 z-10">
									<div className="hidden md:block order-summary mb-4">
										<h5 className="text-text font-bold text-lg mb-4">
											Shopping summary
										</h5>
										<div className="text-text text-body-md flex justify-between items-center">
											<span>{`Total Price (${selectedItems} Items)`}</span>
											<span>{idrTotalPrice}</span>
										</div>
									</div>
									<div className="price-bar flex justify-between items-end font-bold text-lg md:pt-2 md:border-t-2 md:border-primary-800">
										<h2 className="text-text">
											Total Price
										</h2>
										<span className="flex items-end">
											<h3 className="text-text">
												{totalPrice
													? idrTotalPrice
													: `-`}
											</h3>
										</span>
									</div>
									<div className="mt-4">
										<Button
											fullWidth
											color="primary"
											isDisabled={
												totalPrice ? false : true
											}
											onPress={handleGoToCheckout}
										>
											<span className="text-black font-medium text-body-lg">
												Buy {`(${selectedItems})`}
											</span>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<footer className="hidden md:block">
				<Footer />
			</footer>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Warning
							</ModalHeader>
							<ModalBody>
								<p>
									Some items are exceeding the 30kg limit, so
									we should say goodbye to a few. Please
									unselect some products.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button
									className="bg-primary-500"
									onPress={onClose}
								>
									<p className="font-medium text-black">
										Okay
									</p>
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default CartPage;
