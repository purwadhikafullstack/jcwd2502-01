import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/products";

export const store = configureStore({
	reducer: { products: productsSlice },
});
