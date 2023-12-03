import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../lib/axios";

const initialState = {
	stockHistory: [],
	orderField: "",
	orderDirection: "",
	search: "",
	category: [],
	brand: [],
	page: "",
	offset: "",
	count: 0,
	totalPage: 6,
	month: "",
	year: "",
	dateHistory: null,
};

export const historySlice = createSlice({
	name: "history",
	initialState,
	reducers: {
		setStockHistory: (initialState, { payload }) => {
			initialState.stockHistory = payload;
		},
		setCount: (initialState, { payload }) => {
			initialState.count = payload;
		},
		setTotalPage: (initialState, { payload }) => {
			initialState.totalPage = payload;
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
		setCategory: (initialState, { payload }) => {
			if (initialState.category.includes(payload)) {
				const index = initialState.category.indexOf(payload);
				initialState.category.splice(index, 1);
			} else if (payload.length > 1) {
				initialState.category = payload.split(",").filter((v) => {
					return Number(v);
				});
			} else if (payload.length === 0) {
				initialState.category = [];
			} else {
				initialState.category.push(payload);
			}
		},
		setBrand: (initialState, { payload }) => {
			if (initialState.brand.includes(payload)) {
				const index = initialState.brand.indexOf(payload);
				initialState.brand.splice(index, 1);
			} else if (payload.length > 1) {
				initialState.brand = payload.split(",").filter((v) => {
					return Number(v);
				});
			} else if (payload.length === 0) {
				initialState.brand = [];
			} else {
				initialState.brand.push(payload);
			}
		},
		setMonthHistory: (initialState, action) => {
			initialState.month = action.payload;
		},
		setYearHistory: (initialState, action) => {
			initialState.year = action.payload;
		},
		setDateHistory: (initialState, action) => {
			initialState.dateHistory = action.payload;
		},
	},
});
export const fetchStockHistoryAsync = (query) => async (dispatchEvent) => {
	try {
		const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance(accessToken).get(
			`stocks/history${query ? query : ""}`
		);
		console.log(data);
		const totalPage = await Math.ceil(data.data.count / 12);

		dispatchEvent(setTotalPage(totalPage));
		dispatchEvent(setStockHistory(data.data.history));
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
		dispatchEvent(setCategory([]));
		dispatchEvent(setBrand([]));
		dispatchEvent(setMonthHistory(null));
		dispatchEvent(setYearHistory(null));
		dispatchEvent(setDateHistory(null));
	} catch (error) {
		console.log(error);
	}
};

export const {
	setBrand,
	setCategory,
	setStock,
	setCount,
	setOffset,
	setOrderDirection,
	setOrderField,
	setPage,
	setSearch,
	setStockHistory,
	setTotalPage,
	resetOffset,
	resetPage,
	setMonthHistory,
	setYearHistory,
	setDateHistory,
} = historySlice.actions;
export default historySlice.reducer;
