import React from "react";

import { Button } from "@nextui-org/react";

const CartPage = () => {
	return (
		<>
			<main className="cart-page my-container h-[100vh] py-2">
				<div className="page-heading">
					<h3 className="font-bold text-headline-sm">Cart</h3>
				</div>
				<div className="page-body flex">
					<div className="product-cart-list w-full"></div>
					<div className="cart-action">
						<div className="cart-action-card md:col-span-2 md:ml-12 w-full md:w-[320px]">
							<div className="bg-background md:rounded-lg fixed bottom-0 left-0 right-0 md:sticky md:top-[140px] md:bottom-auto shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)]">
								<div className="flex flex-col p-6 pb-10 md:p-6 text-neutral-700">
									<div className="price-bar flex justify-between items-end">
										<h2 className="font-semibold text-text">
											Total Price
										</h2>
										<span className="flex items-end">
											<h3 className="font-bold text-text">
												Rp. 1.000.000
											</h3>
										</span>
									</div>
									<div className="mt-4">
										<Button fullWidth color="primary">
											<span className="text-black font-medium text-body-lg">
												Buy
											</span>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default CartPage;
