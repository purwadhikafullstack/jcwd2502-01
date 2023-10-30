import { axiosInstance } from "../../../lib/axios";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	carts: [],
	totalItems: 0,
	subtotal: 0,
	tax: 0,
	totalAmount: 0,
	count: 0,
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

export const fetchCartAsync = (user_id) => async (dispatchEvent) => {
	try {
		const { data } = await axiosInstance().get(`carts/${user_id}`);

		dispatchEvent(setCarts(data.data.cart));
		dispatchEvent(setCount(data.data.count));
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

export const changeQuantity =
	(user_id, id, change) => async (dispatchEvent) => {
		try {
			await axiosInstance().patch(`carts/${id}?change=${change}`);
			const { data } = await axiosInstance().get(`carts/${user_id}`);

			dispatchEvent(setCarts(data.data.cart));
		} catch (error) {
			console.log(error);
		}
	};

export const deleteOrder = (user_id, id) => async (dispatchEvent) => {
	try {
		await axiosInstance().delete(`carts/${id}`);
		const { data } = await axiosInstance().get(`carts/${user_id}`);

		dispatchEvent(setCarts(data.data.cart));
		dispatchEvent(setCount(data.data.count));
	} catch (error) {
		console.log(error);
	}
};

export const addToCart =
	(user_id, product_id, quantity) => async (dispatchEvent) => {
		try {
			const dataToSend = {
				product_id: Number(product_id),
				quantity,
				user_id,
			};

			await axiosInstance().post(`carts`, dataToSend);

			const { data } = await axiosInstance().get(`carts/${user_id}`);

			dispatchEvent(setCarts(data.data.cart));
			dispatchEvent(setCount(data.data.count));
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
} = cartsSlice.actions;

export default cartsSlice.reducer;
