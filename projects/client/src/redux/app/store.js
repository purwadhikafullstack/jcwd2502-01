import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/products";
import usersSlice from "../features/users";
import cartsSlice from "../features/carts";
import ordersSlice from "../features/orders";
import reportSlice from "../features/report";
import manageUserSlice from "../features/manageUser";
import historySlice from "../features/stocksHistory";

export const store = configureStore({
	reducer: {
		products: productsSlice,
		user: usersSlice,
		carts: cartsSlice,
		orders: ordersSlice,
		report: reportSlice,
		manageUsers: manageUserSlice,
		history: historySlice,
	},
});
