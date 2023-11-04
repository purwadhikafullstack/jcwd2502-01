import { axiosInstance } from "../../../lib/axios";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	carts: [],
	totalItems: 0,
	subtotal: 0,
	tax: 0,
	totalAmount: 0,
	count: 0,
	selectedItems: 0,
	totalPrice: 0,
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
		const { data } = await axiosInstance(token).get(`carts`);

		dispatchEvent(setCarts(data.data.cart));
		dispatchEvent(setCount(data.data.count));
		dispatchEvent(setSelectedItems(data.data.selectedItems));
		dispatchEvent(setTotalPrice(data.data.totalPrice));
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
	(token, product_id, quantity) => async (dispatchEvent) => {
		try {
			const dataToSend = {
				product_id: Number(product_id),
				quantity,
			};

			await axiosInstance(token).post(`carts`, dataToSend);

			const { data } = await axiosInstance(token).get(`carts`);

			console.log(data);

			dispatchEvent(setCarts(data.data.cart));
			dispatchEvent(setCount(data.data.count));
			dispatchEvent(setSelectedItems(data.data.selectedItems));
			dispatchEvent(setTotalPrice(data.data.totalPrice));
		} catch (error) {
			console.log(error);
		}
	};

export const selectProductCart =
	(token, cart_id, type) => async (dispatchEvent) => {
		try {
			await axiosInstance(token).patch(`carts/select/${cart_id}`, {
				type,
			});

			const { data } = await axiosInstance(token).get(`carts`);

			dispatchEvent(setCarts(data.data.cart));
			dispatchEvent(setCount(data.data.count));
			dispatchEvent(setSelectedItems(data.data.selectedItems));
			dispatchEvent(setTotalPrice(data.data.totalPrice));
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
} = cartsSlice.actions;

export default cartsSlice.reducer;
