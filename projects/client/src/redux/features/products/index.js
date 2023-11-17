import { axiosInstance } from "../../../lib/axios";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	productsForStocks: [],
	stockHistory: [],
	productDetail: [],
	orderField: "",
	orderDirection: "",
	search: "",
	category: [],
	brand: [],
	warehouse: null,
	page: 1,
	offset: 0,
	count: 0,
	totalPage: 6,
};

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (initialState, { payload }) => {
			initialState.products = payload;
		},
		setProductsForStocks: (initialState, { payload }) => {
			initialState.productsForStocks = payload;
		},
		setStockHistory: (initialState, { payload }) => {
			initialState.stockHistory = payload;
		},
		setProductDetail: (initialState, { payload }) => {
			initialState.productDetail = payload;
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
		setWarehouse: (initialState, { payload }) => {
			initialState.warehouse = payload;
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
	},
});

// export const fetchProductAsync = (query) => async (dispatchEvent) => {
// 	try {
// 		// const accessToken = localStorage.getItem("accessToken");
// 		const { data } = await axiosInstance().get(
// 			`products/all${query ? query : ""}`
// 		);
// 		const totalPage = await Math.ceil(data.data.count / 12);
// 		dispatchEvent(setTotalPage(totalPage));
// 		dispatchEvent(setProducts(data.data.products));
// 		dispatchEvent(setCount(data.data.count));
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const fetchProductAsync = (query) => (dispatchEvent) => {
	return new Promise(async (resolve, reject) => {
		try {
			// const accessToken = localStorage.getItem("accessToken");
			const { data } = await axiosInstance().get(
				`products/all${query ? query : ""}`
			);
			const totalPage = Math.ceil(data.data.count / 12);

			dispatchEvent(setTotalPage(totalPage));
			dispatchEvent(setProducts(data.data.products));
			dispatchEvent(setCount(data.data.count));
			resolve(); // Mengembalikan resolve() jika berhasil
		} catch (error) {
			console.log(error);
			reject(error); // Mengembalikan reject() jika terjadi error
		}
	});
};
export const fetchStockAsync = (query) => async (dispatchEvent) => {
	try {
		// const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance().get(
			`stocks/all${query ? query : ""}`
		);
		const totalPage = await Math.ceil(data.data.count / 12);
		dispatchEvent(setTotalPage(totalPage));
		dispatchEvent(setProductsForStocks(data.data.products));
		dispatchEvent(setCount(data.data.count));
	} catch (error) {
		console.log(error);
	}
};
export const fetchStockHistoryAsync = (query) => async (dispatchEvent) => {
	try {
		// const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance().get(
			`stocks/history${query ? query : ""}`
		);
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
		dispatchEvent(setCategory([]));
		dispatchEvent(setBrand([]));
	} catch (error) {
		console.log(error);
	}
};

export const {
	setWarehouse,
	setProducts,
	setProductsForStocks,
	setStockHistory,
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
	setTotalPage,
	setProductDetail,
} = productsSlice.actions;

export default productsSlice.reducer;
