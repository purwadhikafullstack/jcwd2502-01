import { axiosInstance } from "../../../lib/axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
	carts: [],
	totalItems: 0,
	subtotal: 0,
	tax: 0,
	totalAmount: 0,
	count: 0,
	selectedItems: 0,
	totalPrice: 0,
	totalWeight: 0,
};

export const cartsSlice = createSlice({
	name: "carts",
	initialState,
	reducers: {
		setCarts: (initialState, { payload }) => {
			initialState.carts = payload;
		},
		setCount: (initialState, { payload }) => {
			initialState.count = payload;
		},
		setSelectedItems: (initialState, { payload }) => {
			initialState.selectedItems = payload;
		},
		setTotalPrice: (initialState, { payload }) => {
			initialState.totalPrice = payload;
		},
		setTotalWeight: (initialState, { payload }) => {
			initialState.totalWeight = payload;
		},
		setTotalItems: (initialState, { payload }) => {
			initialState.totalItems = payload;
		},
		setSubtotal: (initialState, { payload }) => {
			initialState.subtotal = payload;
		},
		setTax: (initialState, { payload }) => {
			initialState.tax = payload;
		},
		setTotalAmount: (initialState, { payload }) => {
			initialState.totalAmount = payload;
		},
	},
});

export const fetchCartAsync = (token) => async (dispatchEvent) => {
	try {
		const selectedProducts = await axiosInstance(token).get(
			`checkouts/selected-products`
		);

		const sumWeight = selectedProducts?.data?.data
			?.map((item) => item?.quantity * item?.product?.weight)
			.reduce((a, b) => a + b, 0);

		const { data } = await axiosInstance(token).get(`carts`);

		dispatchEvent(setCarts(data.data.cart));
		dispatchEvent(setCount(data.data.count));
		dispatchEvent(setSelectedItems(data.data.selectedItems));
		dispatchEvent(setTotalPrice(data.data.totalPrice));
		dispatchEvent(setTotalWeight(sumWeight));
	} catch (error) {
		console.log(error);
	}
};

export const setOrderSummary = (user_id) => async (dispatchEvent) => {
	try {
		let totalItems = 0;
		let subtotal = 0;
		let tax = 0;
		const { data } = await axiosInstance().get(`carts/${user_id}`);

		const carts = data.data;

		carts.map((v) => {
			totalItems += Number(v.quantity);

			subtotal += Number(
				Number(v.product.product_price) * Number(v.quantity)
			);
		});

		tax = 0.1 * subtotal;

		let totalAmount = subtotal + tax;

		dispatchEvent(setTotalItems(totalItems));
		dispatchEvent(setSubtotal(subtotal));
		dispatchEvent(setTax(tax));
		dispatchEvent(setTotalAmount(totalAmount));
	} catch (error) {
		console.log(error);
	}
};

export const changeQuantity = (token, id, change) => async (dispatchEvent) => {
	try {
		await axiosInstance(token).patch(`carts/${id}?change=${change}`);

		const { data } = await axiosInstance(token).get(`carts`);

		dispatchEvent(setCarts(data.data.cart));
		dispatchEvent(setSelectedItems(data.data.selectedItems));
		dispatchEvent(setTotalPrice(data.data.totalPrice));
	} catch (error) {
		console.log(error);
	}
};

export const deleteOrder = (token, id) => async (dispatchEvent) => {
	try {
		await axiosInstance(token).delete(`carts/${id}`);
		const { data } = await axiosInstance(token).get(`carts`);

		dispatchEvent(setCarts(data.data.cart));
		dispatchEvent(setCount(data.data.count));
		dispatchEvent(setSelectedItems(data.data.selectedItems));
		dispatchEvent(setTotalPrice(data.data.totalPrice));
	} catch (error) {
		console.log(error);
	}
};

export const addToCart =
	(token, product_id, quantity, total_stocks) => async (dispatchEvent) => {
		try {
			const dataToSend = {
				product_id: Number(product_id),
				quantity,
				total_stocks,
			};

			await axiosInstance(token).post(`carts`, dataToSend);

			const { data } = await axiosInstance(token).get(`carts`);

			dispatchEvent(setCarts(data.data.cart));
			dispatchEvent(setCount(data.data.count));
			dispatchEvent(setSelectedItems(data.data.selectedItems));
			dispatchEvent(setTotalPrice(data.data.totalPrice));

			return true;
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message, {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
		}
	};

export const selectProductCart =
	(token, cart_id, type) => async (dispatchEvent) => {
		try {
			await axiosInstance(token).patch(`carts/select/${cart_id}`, {
				type,
			});

			const selectedProducts = await axiosInstance(token).get(
				`checkouts/selected-products`
			);

			const sumWeight = selectedProducts?.data?.data
				?.map((item) => item?.quantity * item?.product?.weight)
				.reduce((a, b) => a + b, 0);

			const { data } = await axiosInstance(token).get(`carts`);

			dispatchEvent(setCarts(data.data.cart));
			dispatchEvent(setCount(data.data.count));
			dispatchEvent(setSelectedItems(data.data.selectedItems));
			dispatchEvent(setTotalPrice(data.data.totalPrice));
			dispatchEvent(setTotalWeight(sumWeight));
		} catch (error) {
			console.log(error);
		}
	};

export const {
	setCarts,
	setCount,
	setTotalItems,
	setSubtotal,
	setTax,
	setTotalAmount,
	setSelectedItems,
	setTotalPrice,
	setTotalWeight,
} = cartsSlice.actions;

export default cartsSlice.reducer;
