import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";

const initialState = {
	transaction: [],
	transactionByCategory: [],
	transactionByBrand: [],
	transactionByProduct: [],
	orderFieldTransaction: "",
	orderFieldCategory: "",
	orderFieldBrand: "",
	orderFieldProduct: "",
	orderDirectionTransaction: "",
	orderDirectionCategory: "",
	orderDirectionBrand: "",
	orderDirectionProduct: "",
	searchTransaction: "",
	searchBrand: "",
	searchCategory: "",
	searchProduct: "",
	pageTransaction: 1,
	pageCategory: 1,
	pageBrand: 1,
	pageProduct: 1,
	totalPageTransaction: 6,
	totalPageBrand: 6,
	totalPageCategory: 6,
	totalPageProduct: 6,
	offsetTransaction: "",
	offsetCategory: "",
	offsetBrand: "",
	offsetProduct: "",
	countBrand: 0,
	countTransaction: 0,
	countCategory: 0,
	countProduct: 0,
	month: "",
	year: "",
	isChildComponent: false,
	date: null,
};

export const reportSlice = createSlice({
	name: "report",
	initialState,
	reducers: {
		setTBCategory: (initialState, action) => {
			initialState.transactionByCategory = action.payload;
		},
		setTBBrand: (initialState, action) => {
			initialState.transactionByBrand = action.payload;
		},
		setTBProduct: (initialState, action) => {
			initialState.transactionByProduct = action.payload;
		},
		setTransaction: (initialState, action) => {
			initialState.transaction = action.payload;
		},
		setSearchBrand: (initialState, action) => {
			initialState.searchBrand = action.payload;
		},
		resetPageBrand: (initialState) => {
			initialState.pageBrand = 1;
		},
		resetOffsetBrand: (initialState) => {
			initialState.offsetBrand = 0;
		},
		setCountBrand: (initialState, action) => {
			initialState.countBrand = action.payload;
		},
		setTotalPageBrand: (initialState, action) => {
			initialState.totalPageBrand = action.payload;
		},
		setOrderFieldBrand: (initialState, action) => {
			initialState.orderFieldBrand = action.payload;
		},
		setOrderDirectionBrand: (initialState, action) => {
			initialState.orderDirectionBrand = action.payload;
		},
		setPageBrand: (initialState, { payload }) => {
			initialState.pageBrand = payload;
		},
		setOffsetBrand: (initialState, { payload }) => {
			initialState.offsetBrand = payload;
		},
		setSearchCategory: (initialState, action) => {
			initialState.searchCategory = action.payload;
		},
		resetPageCategory: (initialState) => {
			initialState.pageCategory = 1;
		},
		resetOffsetCategory: (initialState) => {
			initialState.offsetCategory = 0;
		},
		setOrderFieldCategory: (initialState, action) => {
			initialState.orderFieldCategory = action.payload;
		},
		setOrderDirectionCategory: (initialState, action) => {
			initialState.orderDirectionCategory = action.payload;
		},
		setPageCategory: (initialState, { payload }) => {
			initialState.pageCategory = payload;
		},
		setOffsetCategory: (initialState, { payload }) => {
			initialState.offsetCategory = payload;
		},
		setCountCategory: (initialState, action) => {
			initialState.countCategory = action.payload;
		},
		setTotalPageCategory: (initialState, action) => {
			initialState.totalPageCategory = action.payload;
		},
		setSearchTransaction: (initialState, action) => {
			initialState.searchTransaction = action.payload;
		},
		resetPageTransaction: (initialState) => {
			initialState.pageTransaction = 1;
		},
		resetOffsetTransaction: (initialState) => {
			initialState.offsetTransaction = 0;
		},
		setOrderFieldTransaction: (initialState, action) => {
			initialState.orderFieldTransaction = action.payload;
		},
		setOrderDirectionTransaction: (initialState, action) => {
			initialState.orderDirectionTransaction = action.payload;
		},
		setPageTransaction: (initialState, { payload }) => {
			initialState.pageTransaction = payload;
		},
		setOffsetTransaction: (initialState, { payload }) => {
			initialState.offsetTransaction = payload;
		},
		setCountTransaction: (initialState, action) => {
			initialState.countTransaction = action.payload;
		},
		setTotalPageTransaction: (initialState, action) => {
			initialState.totalPageTransaction = action.payload;
		},
		setSearchProduct: (initialState, action) => {
			initialState.searchProduct = action.payload;
		},
		resetPageProduct: (initialState) => {
			initialState.pageProduct = 1;
		},
		resetOffsetProduct: (initialState) => {
			initialState.offsetProduct = 0;
		},
		setOrderFieldProduct: (initialState, action) => {
			initialState.orderFieldProduct = action.payload;
		},
		setOrderDirectionProduct: (initialState, action) => {
			initialState.orderDirectionProduct = action.payload;
		},
		setPageProduct: (initialState, { payload }) => {
			initialState.pageProduct = payload;
		},
		setOffsetProduct: (initialState, { payload }) => {
			initialState.offsetProduct = payload;
		},
		setCountProduct: (initialState, action) => {
			initialState.countProduct = action.payload;
		},
		setTotalPageProduct: (initialState, action) => {
			initialState.totalPageProduct = action.payload;
		},
		setMonth: (initialState, action) => {
			initialState.month = action.payload;
		},
		setYear: (initialState, action) => {
			initialState.year = action.payload;
		},
		setIsChildComponent: (initialState, action) => {
			initialState.isChildComponent = action.payload;
		},
		setDate: (initialState, action) => {
			initialState.date = action.payload;
		},
	},
});

export const getTransaction = (query) => async (dispatch) => {
	try {
		const token = localStorage.getItem("accessToken");
		const getData = await axiosInstance(token).get(
			`reports/getTransaction${query ? query : ""}`
		);
		console.log(getData.data);
		const totalPage = await Math.ceil(getData.data.data.count / 12);
		dispatch(setTotalPageTransaction(totalPage));
		dispatch(setTransaction(getData.data.data.order));
		dispatch(setCountTransaction(getData.data.data.count));
	} catch (error) {
		console.log(error);
	}
};

export const getTransactionByCategory = (query) => async (dispatch) => {
	try {
		const token = localStorage.getItem("accessToken");
		const getData = await axiosInstance(token).get(
			`reports/getCategory${query ? query : ""}`
		);
		console.log(getData.data.data);
		const totalPage = await Math.ceil(getData.data.data.count / 12);
		dispatch(setTotalPageCategory(totalPage));
		// dispatch(setTBCategory(getData.data.data));
		dispatch(setTBCategory(getData.data.data.dataBrand));
		dispatch(setCountCategory(getData.data.data.count));
	} catch (error) {
		console.log(error);
	}
};

export const getTransactionByBrand = (query) => async (dispatch) => {
	try {
		const token = localStorage.getItem("accessToken");
		const getData = await axiosInstance(token).get(
			`reports/getBrand${query ? query : ""}`
		);
		console.log(getData.data.data);
		const totalPage = await Math.ceil(getData.data.data.count / 12);
		dispatch(setTotalPageBrand(totalPage));
		dispatch(setTBBrand(getData.data.data.dataBrand));
		dispatch(setCountBrand(getData.data.data.count));
	} catch (error) {
		console.log(error);
	}
};

export const getTransactionByProduct = (query) => async (dispatch) => {
	try {
		const token = localStorage.getItem("accessToken");
		const getData = await axiosInstance(token).get(
			`reports${query ? query : ""}`
		);
		const totalPage = await Math.ceil(getData.data.data.count / 12);
		dispatch(setTotalPageProduct(totalPage));
		console.log(getData.data.data.order);
		dispatch(setTBProduct(getData.data.data.order));
		dispatch(setCountProduct(getData.data.data.count));
	} catch (error) {
		console.log(error);
	}
};

export const onSearchBrand = (search) => async (dispatchEvent) => {
	try {
		dispatchEvent(setSearchBrand(search));
		dispatchEvent(resetPageBrand());
		dispatchEvent(resetOffsetBrand());
	} catch (error) {
		console.log(error);
	}
};
export const onSearchCategory = (search) => async (dispatchEvent) => {
	try {
		dispatchEvent(setSearchCategory(search));
		dispatchEvent(resetPageCategory());
		dispatchEvent(resetOffsetCategory());
	} catch (error) {
		console.log(error);
	}
};

export const onSearchTransaction = (search) => async (dispatchEvent) => {
	try {
		dispatchEvent(setSearchTransaction(search));
		dispatchEvent(resetPageTransaction());
		dispatchEvent(resetOffsetTransaction());
	} catch (error) {
		console.log(error);
	}
};
export const onSearchProduct = (search) => async (dispatchEvent) => {
	try {
		dispatchEvent(setSearchProduct(search));
		dispatchEvent(resetPageProduct());
		dispatchEvent(resetOffsetProduct());
	} catch (error) {
		console.log(error);
	}
};

export const onSortB = (field, direction) => async (dispatchEvent) => {
	try {
		dispatchEvent(setOrderFieldBrand(field));
		dispatchEvent(setOrderDirectionBrand(direction));
		dispatchEvent(resetPageBrand());
		dispatchEvent(resetOffsetBrand());
	} catch (error) {
		console.log(error);
	}
};

export const onSortC = (field, direction) => async (dispatchEvent) => {
	try {
		dispatchEvent(setOrderFieldCategory(field));
		dispatchEvent(setOrderDirectionCategory(direction));
		dispatchEvent(resetPageCategory());
		dispatchEvent(resetOffsetCategory());
	} catch (error) {
		console.log(error);
	}
};
export const onSortT = (field, direction) => async (dispatchEvent) => {
	try {
		dispatchEvent(setOrderFieldTransaction(field));
		dispatchEvent(setOrderDirectionTransaction(direction));
		dispatchEvent(resetPageTransaction());
		dispatchEvent(resetOffsetTransaction());
	} catch (error) {
		console.log(error);
	}
};
export const onSortP = (field, direction) => async (dispatchEvent) => {
	try {
		dispatchEvent(setOrderFieldProduct(field));
		dispatchEvent(setOrderDirectionProduct(direction));
		dispatchEvent(resetPageProduct());
		dispatchEvent(resetOffsetProduct());
	} catch (error) {
		console.log(error);
	}
};

export const onClearBrand = () => async (dispatchEvent) => {
	try {
		dispatchEvent(resetPageBrand());
		dispatchEvent(resetOffsetBrand());
		dispatchEvent(setOrderFieldBrand(""));
		dispatchEvent(setOrderDirectionBrand(""));
		dispatchEvent(setSearchBrand(""));
		dispatchEvent(setMonth(null));
		dispatchEvent(setYear(null));
		dispatchEvent(setDate(null));
	} catch (error) {
		console.log(error);
	}
};
export const onClearCategory = () => async (dispatchEvent) => {
	try {
		dispatchEvent(resetPageCategory());
		dispatchEvent(resetOffsetCategory());
		dispatchEvent(setOrderFieldCategory(""));
		dispatchEvent(setOrderDirectionCategory(""));
		dispatchEvent(setSearchCategory(""));
		dispatchEvent(setMonth(null));
		dispatchEvent(setYear(null));
		dispatchEvent(setDate(null));
	} catch (error) {
		console.log(error);
	}
};

export const onClearTransaction = () => async (dispatchEvent) => {
	try {
		dispatchEvent(resetPageTransaction());
		dispatchEvent(resetOffsetTransaction());
		dispatchEvent(setOrderFieldTransaction(""));
		dispatchEvent(setOrderDirectionTransaction(""));
		dispatchEvent(setSearchTransaction(""));
		dispatchEvent(setMonth(null));
		dispatchEvent(setYear(null));
		dispatchEvent(setDate(null));
		// dispatchEvent(setIsChildComponent(!isChildComponent))
	} catch (error) {
		console.log(error);
	}
};
export const onClearProduct = () => async (dispatchEvent) => {
	try {
		dispatchEvent(resetPageProduct());
		dispatchEvent(resetOffsetProduct());
		dispatchEvent(setOrderFieldProduct(""));
		dispatchEvent(setOrderDirectionProduct(""));
		dispatchEvent(setSearchProduct(""));
		dispatchEvent(setMonth(null));
		dispatchEvent(setYear(null));
		dispatchEvent(setDate(null));
	} catch (error) {
		console.log(error);
	}
};

export const setPaginationBrand = (page, offset) => async (dispatchEvent) => {
	try {
		dispatchEvent(setPageBrand(page));
		dispatchEvent(setOffsetBrand(offset));
	} catch (error) {
		console.log(error);
	}
};
export const setPaginationCategory =
	(page, offset) => async (dispatchEvent) => {
		try {
			dispatchEvent(setPageCategory(page));
			dispatchEvent(setOffsetCategory(offset));
		} catch (error) {
			console.log(error);
		}
	};

export const setPaginationTransaction =
	(page, offset) => async (dispatchEvent) => {
		try {
			dispatchEvent(setPageTransaction(page));
			dispatchEvent(setOffsetTransaction(offset));
		} catch (error) {
			console.log(error);
		}
	};

export const setPaginationProduct = (page, offset) => async (dispatchEvent) => {
	try {
		dispatchEvent(setPageProduct(page));
		dispatchEvent(setOffsetProduct(offset));
	} catch (error) {
		console.log(error);
	}
};

// export const setDate = (date) => async (dispatch) => {
// 	try {
// 		dispatch(setMonth(String(date.getMonth() + 1)));
// 		dispatch(setYear(String(date.getFullYear())));
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const {
	setMonth,
	setYear,
	setTBCategory,
	setTBBrand,
	setTransaction,
	setTBProduct,
	setSearchBrand,
	resetPageBrand,
	resetOffsetBrand,
	setCountBrand,
	setTotalPageBrand,
	setPageBrand,
	setOffsetBrand,
	setOrderFieldBrand,
	setOrderDirectionBrand,
	setSearchCategory,
	resetPageCategory,
	resetOffsetCategory,
	setCountCategory,
	setTotalPageCategory,
	setPageCategory,
	setOffsetCategory,
	setOrderFieldCategory,
	setOrderDirectionCategory,
	setSearchTransaction,
	resetPageTransaction,
	resetOffsetTransaction,
	setCountTransaction,
	setTotalPageTransaction,
	setPageTransaction,
	setOffsetTransaction,
	setOrderFieldTransaction,
	setOrderDirectionTransaction,
	setSearchProduct,
	resetPageProduct,
	resetOffsetProduct,
	setCountProduct,
	setTotalPageProduct,
	setPageProduct,
	setOffsetProduct,
	setOrderFieldProduct,
	setOrderDirectionProduct,
	setIsChildComponent,
	setDate,
} = reportSlice.actions;
export default reportSlice.reducer;
