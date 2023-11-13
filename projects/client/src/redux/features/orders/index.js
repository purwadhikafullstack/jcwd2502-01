import { axiosInstance } from "../../../lib/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	orders: [],
	totalPages: 0,
	currentPage: 0,
	page: 1,
};

export const ordersSlice = createSlice({
	name: "carts",
	initialState,
	reducers: {
		setOrders: (initialState, { payload }) => {
			initialState.orders = payload;
		},
		setTotalPages: (initialState, { payload }) => {
			initialState.totalPages = payload;
		},
		setPage: (initialState, { payload }) => {
			initialState.page = payload;
		},
	},
});

export const fetchOrdersAsync = (token, page) => async (dispatch) => {
	try {
		const { data } = await axiosInstance(token).get(`orders?page=${page}`);

		console.log(data);

		dispatch(setOrders(data.data.orderList));
		dispatch(setTotalPages(data.data.pagination.totalPages));
	} catch (error) {
		console.log(error);
	}
};

export const onSetPagination = (page) => async (dispatch) => {
	try {
		dispatch(setPage(page));
	} catch (error) {
		console.log(error);
	}
};

export const { setOrders, setTotalPages, setPage } = ordersSlice.actions;

export default ordersSlice.reducer;
