// ordersSlice.js
import { axiosInstance } from "../../../lib/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	orders: [],
	totalPages: 0,
	currentPage: 1,
	currentStatus: "",
	currentWarehouseId: "",
	page: 1,
	warehouseId: "",
	status: "",
	offset: 0,
	count: 0,
	search: "",
};

export const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		setOrders: (state, { payload }) => {
			state.orders = payload;
		},
		setTotalPages: (state, { payload }) => {
			state.totalPages = payload;
		},
		setPage: (state, { payload }) => {
			state.page = payload;
		},
		setCurrentPage: (state, { payload }) => {
			state.currentPage = payload;
		},
		setWarehouseId: (state, { payload }) => {
			state.warehouseId = payload;
		},
		setCurrentWarehouseId: (state, { payload }) => {
			state.currentWarehouseId = payload;
		},
		setStatus: (state, { payload }) => {
			state.status = payload;
		},
		setCurrentStatus: (state, { payload }) => {
			state.currentStatus = payload;
		},
		setOffset: (state, { payload }) => {
			state.offset = payload;
		},
		setCount: (state, { payload }) => {
			state.count = payload;
		},
		setSearch: (state, { payload }) => {
			state.search = payload;
		},
	},
});

export const fetchOrdersAsync = (token, page) => async (dispatch) => {
	try {
		const { data } = await axiosInstance(token).get(`orders?page=${page}`);
		dispatch(setOrders(data.data.orderList));
		dispatch(setTotalPages(data.data.pagination.totalPages));
	} catch (error) {
		console.log(error);
	}
};

export const fetchAdminOrderListAsync =
	(token, page = 1, status = "", search = "", warehouse = "") =>
	async (dispatch) => {
		try {
			console.log(page, status, search, warehouse);

			const { data } = await axiosInstance(token).get(
				`orders/admin/order-list?page=${page}&status=${status}&search=${search}&warehouse_id=${warehouse}`
			);

			dispatch(setOrders(data.data.orderList));
			dispatch(setTotalPages(data.data.pagination.totalPages));
			dispatch(setOffset(data.data.pagination.offset));
			dispatch(setCount(data.data.pagination.count));
		} catch (error) {
			console.log(error);
		}
	};

export const onPageChange =
	(token, newPage, status, search, warehouse) => async (dispatch) => {
		try {
			dispatch(
				fetchAdminOrderListAsync(
					token,
					newPage,
					status,
					search,
					warehouse
				)
			);
			dispatch(setPage(newPage));
			dispatch(updateUrl(newPage, status, search, warehouse));
		} catch (error) {
			console.log(error);
		}
	};

export const onStatusChange =
	(token, newStatus, searchQuery, warehouseId) => async (dispatch) => {
		try {
			dispatch(setPage(1));
			dispatch(
				fetchAdminOrderListAsync(
					token,
					1,
					newStatus,
					searchQuery,
					warehouseId
				)
			);
			dispatch(updateUrl(1, newStatus, searchQuery, warehouseId));
		} catch (error) {
			console.log(error);
		}
	};

export const onWarehouseChange =
	(token, status, searchQuery, newWarehouse) => async (dispatch) => {
		try {
			dispatch(setPage(1));
			dispatch(
				fetchAdminOrderListAsync(
					token,
					1,
					status,
					searchQuery,
					newWarehouse
				)
			);
			dispatch(updateUrl(1, status, searchQuery, newWarehouse));
		} catch (error) {
			console.log(error);
		}
	};

export const onClear = (token) => (dispatch) => {
	dispatch(setSearch(""));
	dispatch(fetchAdminOrderListAsync(token, 1, "", "", ""));
	dispatch(updateUrl(1, "", "", ""));
};

export const updateUrl =
	(page, status, search, warehouse) => async (dispatch) => {
		const params = new URLSearchParams();
		if (page) params.set("page", page);
		if (status) params.set("status", status);
		if (search) params.set("search", search);
		if (warehouse) params.set("warehouse", warehouse);

		const queryString = params.toString();
		const newUrl = queryString
			? `${window.location.pathname}?${queryString}`
			: window.location.pathname;

		window.history.replaceState({}, "", newUrl);
	};

export const {
	setOrders,
	setTotalPages,
	setPage,
	setStatus,
	setCurrentPage,
	setCurrentStatus,
	setCurrentWarehouseId,
	setWarehouseId,
	setOffset,
	setCount,
	setSearch,
} = ordersSlice.actions;

export default ordersSlice.reducer;
