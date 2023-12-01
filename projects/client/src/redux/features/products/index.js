import { axiosInstance } from "../../../lib/axios";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	productsForStocks: [],
	stockHistory: [],
	stockMutations: [],
	productDetail: [],
	orderField: "",
	orderDirection: "",
	search: "",
	status: "pending",
	category: [],
	categories: [],
	brand: [],
	brands: [],
	warehouse: null,
	warehouses: [],
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
		setStockMutations: (initialState, { payload }) => {
			initialState.stockMutations = payload;
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
		setStatus: (initialState, { payload }) => {
			initialState.status = payload;
		},
		setWarehouse: (initialState, { payload }) => {
			initialState.warehouse = payload;
		},
		setWarehouses: (initialState, { payload }) => {
			initialState.warehouses = payload;
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
		setCategories: (initialState, { payload }) => {
			initialState.categories = payload;
		},
		setBrands: (initialState, { payload }) => {
			initialState.brands = payload;
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

export const fetchProductAsync = (query) => async (dispatchEvent) => {
	try {
		const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance(accessToken).get(
			`products/all${query ? query : ""}`
		);

		const totalPage = await Math.ceil(data.data.count / 12);
		dispatchEvent(setTotalPage(totalPage));
		dispatchEvent(setProducts(data.data.products));
		dispatchEvent(setCount(data.data.count));
	} catch (error) {
		console.log(error);
	}
};
export const fetchBrandsAsync = (query) => async (dispatchEvent) => {
	try {
		const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance(accessToken).get(
			`brands/all-products${query ? query : ""}`
		);
		const totalPage = await Math.ceil(data.data.count / 12);
		dispatchEvent(setTotalPage(totalPage));
		dispatchEvent(setBrands(data.data.brands));
		dispatchEvent(setCount(data.data.count));
	} catch (error) {
		console.log(error);
	}
};
export const fetchCategoriesAsync = (query) => async (dispatchEvent) => {
	try {
		const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance(accessToken).get(
			`categories/all-products${query ? query : ""}`
		);
		const totalPage = await Math.ceil(data.data.count / 12);
		dispatchEvent(setTotalPage(totalPage));
		dispatchEvent(setCategories(data.data.categories));
		dispatchEvent(setCount(data.data.count));
	} catch (error) {
		console.log(error);
	}
};
export const fetchWarehousesAsync = (query) => async (dispatchEvent) => {
	try {
		const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance(accessToken).get(
			`warehouses/list${query ? query : ""}`
		);
		const totalPage = await Math.ceil(data.data.count / 12);
		dispatchEvent(setTotalPage(totalPage));
		dispatchEvent(setWarehouses(data.data.warehouses));
		dispatchEvent(setCount(data.data.count));
	} catch (error) {
		console.log(error);
	}
};

export const fetchStockAsync = (query) => async (dispatchEvent) => {
	try {
		const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance(accessToken).get(
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
		const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance(accessToken).get(
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
export const fetchStockMutationsAsync =
	(type, query) => async (dispatchEvent) => {
		try {
			if (type === "in") {
				const accessToken = localStorage.getItem("accessToken");
				const { data } = await axiosInstance(accessToken).get(
					`stocks/mutation-in${query ? query : ""}`
				);
				const totalPage = await Math.ceil(data.data.count / 12);
				dispatchEvent(setTotalPage(totalPage));
				dispatchEvent(setStockMutations(data.data.mutations));
				dispatchEvent(setCount(data.data.count));
			} else if (type === "out") {
				const accessToken = localStorage.getItem("accessToken");
				const { data } = await axiosInstance(accessToken).get(
					`stocks/mutation-out${query ? query : ""}`
				);
				const totalPage = await Math.ceil(data.data.count / 12);
				dispatchEvent(setTotalPage(totalPage));
				dispatchEvent(setStockMutations(data.data.mutations));
				dispatchEvent(setCount(data.data.count));
			}
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
	} catch (error) {
		console.log(error);
	}
};

export const {
	setBrands,
	setCategories,
	setWarehouses,
	setStatus,
	setWarehouse,
	setProducts,
	setProductsForStocks,
	setStockHistory,
	setStockMutations,
	setOrderField,
	setOrderDirection,
	setSearch,
	setPage,
	setOffset,
	resetPage,
	resetOffset,
	setCategory,
	setBrand,
	setCount,
	setTotalPage,
	setProductDetail,
} = productsSlice.actions;

export default productsSlice.reducer;
