import React, { useCallback, useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/carts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import SuccessAddToCartModal from "./SuccessAddToCartModal";

const OrderAction = () => {
	const token = localStorage.getItem("accessToken");
	const [stocks, setStocks] = useState(0);
	const [selectedAmount, setSelectedAmount] = useState(1);
	const [productPrice, setProductPrice] = useState(0);
	const [success, setSuccess] = useState(false);
	const [click, setClick] = useState(true);
	const { status, role } = useSelector((state) => state.user);
	const productDetail = useSelector((state) => state.products.productDetail);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const renderSuccessAddToCartModal = useCallback(() => {
		return success ? (
			<SuccessAddToCartModal
				productDetailData={productDetail}
				open={success}
				handleSuccessState={() => {
					setSuccess(false);
				}}
			/>
		) : null;
	}, [success]);

	const handleOrder = async () => {
		if (!click) return;

		if (role === "") {
			navigate("/login");
		} else if (status === "unverified") {
			toast.error("Must verify your email first!");
		} else {
			try {
				const result = await dispatch(
					addToCart(token, productDetail?.id, selectedAmount, stocks)
				);

				setSuccess(result);
			} catch (error) {}
		}

		setClick(false);
		setTimeout(() => setClick(true), 1000);
	};

	const onChangeAmount = (operation) => {
		if (operation === "minus") {
			if (selectedAmount === 1) {
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
					<div className="bg-background md:rounded-lg fixed bottom-0 left-0 right-0 md:sticky md:top-[140px] md:bottom-auto shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)] md:border-2 border-primary-100 dark:border-primary-900">
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
										isDisabled={selectedAmount <= 1}
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
										max={99999}
										className="text-text w-full"
									/>
									<Button
										isIconOnly
										color="primary"
										size="sm"
										variant="light"
										isDisabled={selectedAmount >= stocks}
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
									onClick={() => handleOrder()}
								>
									<span className="text-black font-bold text-base flex items-center gap-2">
										<span className="text-xl">+</span>
										<span>Add to cart</span>
									</span>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
			{renderSuccessAddToCartModal()}
		</>
	);
};

export default OrderAction;
