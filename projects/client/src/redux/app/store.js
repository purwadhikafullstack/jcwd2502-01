import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/products";
import usersSlice from "../features/users";
import cartsSlice from "../features/carts";

export const store = configureStore({
	reducer: { products: productsSlice, users: usersSlice, carts: cartsSlice },
});
