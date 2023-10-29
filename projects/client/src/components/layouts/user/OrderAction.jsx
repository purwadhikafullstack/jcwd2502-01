import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const OrderAction = () => {
	const [stocks, setStocks] = useState(0);
	const [selectedAmount, setSelectedAmount] = useState(0);
	const [productPrice, setProductPrice] = useState(0);

	const productDetail = useSelector((state) => state.products.productDetail);

	const onChangeAmount = (operation) => {
		if (operation === "minus") {
			if (selectedAmount === 0) {
				return;
			} else {
				setSelectedAmount(selectedAmount - 1);
			}
		} else if (operation === "plus") {
			if (selectedAmount === stocks) {
				return;
			} else {
				setSelectedAmount(selectedAmount + 1);
			}
		}
	};

	useEffect(() => {
		if (productDetail?.stocks) {
			let totalStocks = 0;
			productDetail?.stocks.map((stock) => {
				totalStocks += stock.stocks;
			});
			setStocks(totalStocks);
		}
		if (productDetail?.product_price) {
			setProductPrice(productDetail?.product_price);
		}
	}, [productDetail]);

	return (
		<>
			<section className="order-action">
				<div className="cart-action-card md:col-span-2 md:ml-12 w-full md:w-[320px] md:fixed">
					<div className="bg-background md:rounded-lg fixed bottom-0 left-0 right-0 md:sticky md:top-[140px] md:bottom-auto shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)]">
						<div className="flex flex-col p-4 pb-10 md:p-6 text-neutral-700">
							<div className="hidden md:block title mb-2">
								<h5 className="font-bold text-text">
									Set the quantity
								</h5>
							</div>
							<div className="quantity-control flex justify-between items-center mb-4">
								<div className="quantity flex">
									<Button
										isIconOnly
										color="primary"
										size="sm"
										variant="light"
										radius="full"
										onClick={() => {
											onChangeAmount("minus");
										}}
									>
										<IoRemoveCircleOutline
											size={26}
											color="#24ef00"
										/>
									</Button>
									<Input
										type="number"
										name="quantity"
										size="sm"
										value={selectedAmount}
										min={1}
										max={999999}
										className="text-text"
									/>
									<Button
										isIconOnly
										color="primary"
										size="sm"
										variant="light"
										radius="full"
										onClick={() => {
											onChangeAmount("plus");
										}}
									>
										<IoAddCircleOutline
											size={26}
											color="#24ef00"
										/>
									</Button>
								</div>
								<div className="stocks text-text">
									Stocks: {stocks}
								</div>
							</div>
							<div className="price-bar flex justify-between items-end">
								<h2 className="font-semibold text-text">
									Subtotal
								</h2>
								<span className="flex items-end">
									<h3 className="font-bold text-text">
										{productPrice &&
											(
												productPrice * selectedAmount
											).toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
												minimumFractionDigits: 0,
												maximumFractionDigits: 0,
											})}
									</h3>
								</span>
							</div>
							<div className="mt-4">
								<Button
									fullWidth
									color="primary"
									disabled={!stocks}
								>
									<span className="text-black font-medium text-body-lg flex items-center">
										<span className="text-[22px] mr-2">
											+
										</span>{" "}
										Add to cart
									</span>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default OrderAction;
