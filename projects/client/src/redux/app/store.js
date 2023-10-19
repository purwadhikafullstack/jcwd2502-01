import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/products";
import { userSlice } from "../features/users";

export const store = configureStore({
	reducer: { products: productsSlice, user: userSlice },
});
