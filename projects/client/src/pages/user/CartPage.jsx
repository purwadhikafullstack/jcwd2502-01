import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import { Button } from "@nextui-org/react";

import ProductCartCard from "../../components/uis/Cards/ProductCartCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAsync } from "../../redux/features/carts";
import EmptyCartSVG from "../../assets/illustrations/EmptyCartSVG";
import Footer from "../../components/layouts/Footer";

const CartPage = () => {
	const cart = useSelector((state) => state.carts.carts);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCartAsync(1));
	}, []);

	return (
		<>
			<main className="cart-page max-w-full min-h-screen mx-[16px] md:max-w-[1120px] md:min-h-[90vh] md:mx-auto py-4 pb-44 md:pb-24">
				<div className="page-heading mb-4">
					<h3 className="font-bold text-headline-sm">Cart</h3>
				</div>
				<div className="page-body md:grid md:grid-cols-6">
					<div className="product-cart-list w-full col-span-4">
						{cart.length ? (
							<>
								<div className="product-cart-list-wrapper">
									<div>
										{cart?.map((product) => {
											return (
												<>
													<ProductCartCard
														dataProduct={product}
													/>
												</>
											);
										})}
									</div>
								</div>
							</>
						) : (
							<>
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
										<Button color="primary" className="">
											<span className="font-medium text-black">
												Explore Products
											</span>
										</Button>
									</Link>
								</div>
							</>
						)}
					</div>
					<div className="cart-action col-span-2">
						<div className="cart-action-card md:col-span-2 md:ml-12 w-full md:w-[320px] md:fixed">
							<div className="bg-background md:rounded-lg fixed bottom-0 left-0 right-0 md:sticky md:top-[140px] md:bottom-auto shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)]">
								<div className="flex flex-col p-6 pb-10 md:p-6 text-neutral-700">
									<div className="hidden md:block order-summary mb-4">
										<h5 className="text-text font-medium mb-4">
											Order summary
										</h5>
										<div className="text-text text-body-md flex justify-between items-center">
											<span>{`Total Harga (2 Items)`}</span>
											<span>{`Rp. 2.990.000`}</span>
										</div>
									</div>
									<div className="price-bar flex justify-between items-end">
										<h2 className="font-semibold text-text">
											Total Price
										</h2>
										<span className="flex items-end">
											<h3 className="font-bold text-text">
												Rp. 2.990.000
											</h3>
										</span>
									</div>
									<div className="mt-4">
										<Button fullWidth color="primary">
											<span className="text-black font-medium text-body-lg">
												Buy {"(2)"}
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
		</>
	);
};

export default CartPage;
