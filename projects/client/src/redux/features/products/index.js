import { axiosInstance } from "../../../lib/axios";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	orderField: "",
	orderDirection: "",
	search: "",
	category: [],
	brand: [],
	page: 1,
	offset: 0,
	count: 0,
};

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (initialState, { payload }) => {
			initialState.products = payload;
		},
		setCount: (initialState, { payload }) => {
			initialState.count = payload;
		},
		setOrderField: (initialState, { payload }) => {
			initialState.orderField = payload;
		},
		setOrderDirection: (initialState, { payload }) => {
			initialState.orderDirection = payload;
		},
		setSearch: (initialState, { payload }) => {
			initialState.search = payload;
		},
		setPage: (initialState, { payload }) => {
			initialState.page = payload;
		},
		setOffset: (initialState, { payload }) => {
			initialState.offset = payload;
		},
		resetPage: (initialState) => {
			initialState.page = 1;
		},
		resetOffset: (initialState) => {
			initialState.offset = 0;
		},
		nextPage: (initialState) => {
			initialState.page += 1;
		},
		addOffset: (initialState) => {
			initialState.offset += 10;
		},
		previousPage: (initialState) => {
			if (initialState.page == 1) {
				initialState.page = 1;
			} else {
				initialState.page -= 1;
			}
		},
		subtractOffset: (initialState) => {
			if (initialState.offset == 0) {
				initialState.offset = 0;
			} else {
				initialState.offset -= 10;
			}
		},
		setCategory: (initialState, { payload }) => {
			if (initialState.category.includes(payload)) {
				const index = initialState.category.indexOf(payload);
				initialState.category.splice(index, 1);
			} else {
				initialState.category.push(payload);
			}
		},
		setBrand: (initialState, { payload }) => {
			if (initialState.brand.includes(payload)) {
				const index = initialState.brand.indexOf(payload);
				initialState.brand.splice(index, 1);
			} else {
				initialState.brand.push(payload);
			}
		},
	},
});

export const fetchProductAsync = (query) => async (dispatchEvent) => {
	try {
		// const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance().get(
			`products/all${query ? query : ""}`
		);
		dispatchEvent(setProducts(data.data.products));
		dispatchEvent(setCount(data.data.count));
	} catch (error) {
		console.log(error);
	}
};
export const onSort = (field, direction) => async (dispatchEvent) => {
	try {
		dispatchEvent(setOrderField(field));
		dispatchEvent(setOrderDirection(direction));
		dispatchEvent(resetPage());
		dispatchEvent(resetOffset());
	} catch (error) {
		console.log(error);
	}
};
export const onSearch = (search) => async (dispatchEvent) => {
	try {
		dispatchEvent(setSearch(search));
		dispatchEvent(resetPage());
		dispatchEvent(resetOffset());
	} catch (error) {
		console.log(error);
	}
};
export const onCategory = (category) => async (dispatchEvent) => {
	try {
		dispatchEvent(setCategory(category));
		dispatchEvent(resetPage());
		dispatchEvent(resetOffset());
	} catch (error) {
		console.log(error);
	}
};
export const onBrand = (brand) => async (dispatchEvent) => {
	try {
		dispatchEvent(setBrand(brand));
		dispatchEvent(resetPage());
		dispatchEvent(resetOffset());
	} catch (error) {
		console.log(error);
	}
};
export const onNextPage = () => async (dispatchEvent) => {
	try {
		dispatchEvent(nextPage());
		dispatchEvent(addOffset());
	} catch (error) {
		console.log(error);
	}
};
export const onPreviousPage = () => async (dispatchEvent) => {
	try {
		dispatchEvent(previousPage());
		dispatchEvent(subtractOffset());
	} catch (error) {
		console.log(error);
	}
};
export const setPagination = (page, offset) => async (dispatchEvent) => {
	try {
		dispatchEvent(setPage(page));
		dispatchEvent(setOffset(offset));
	} catch (error) {
		console.log(error);
	}
};

export const onClear = () => async (dispatchEvent) => {
	try {
		dispatchEvent(resetPage());
		dispatchEvent(resetOffset());
		dispatchEvent(setOrderField(""));
		dispatchEvent(setOrderDirection(""));
		dispatchEvent(setCategory(""));
	} catch (error) {
		console.log(error);
	}
};

export const {
	setProducts,
	setOrderField,
	setOrderDirection,
	setSearch,
	setPage,
	setOffset,
	nextPage,
	addOffset,
	previousPage,
	subtractOffset,
	resetPage,
	resetOffset,
	setCategory,
	setBrand,
	setCount,
} = productsSlice.actions;

export default productsSlice.reducer;
