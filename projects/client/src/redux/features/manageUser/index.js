import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../lib/axios";

const initialState = {
	user: [],
	countUser: 0,
	totalPageUser: 6,
	offsetUser: 0,
	pageUser: 1,
	searchUser: "",
	admin: [],
	countAdmin: 0,
	totalPageAdmin: 6,
	offsetAdmin: 0,
	pageAdmin: 1,
	searchAdmin: "",
	orderFieldUser: "",
	orderDirectionUser: "",
	orderFieldAdmin: "",
	orderDirectionAdmin: "",
};

export const manageUserSlice = createSlice({
	name: "manageUsers",
	initialState,
	reducers: {
		setUser: (initialState, { payload }) => {
			initialState.user = payload;
		},
		setCountUser: (initialState, { payload }) => {
			initialState.countUser = payload;
		},
		setTotalPageUser: (initialState, { payload }) => {
			initialState.totalPageUser = payload;
		},
		setOrderFieldUser: (initialState, { payload }) => {
			initialState.orderFieldUser = payload;
		},
		setOrderDirectionUser: (initialState, { payload }) => {
			initialState.orderDirectionUser = payload;
		},
		setSearchUser: (initialState, { payload }) => {
			initialState.searchUser = payload;
		},
		resetPageUser: (initialState) => {
			initialState.pageUser = 1;
		},
		resetOffsetUser: (initialState) => {
			initialState.offsetUser = 0;
		},
		setPageUser: (initialState, { payload }) => {
			initialState.pageUser = payload;
		},
		setOffsetUser: (initialState, { payload }) => {
			initialState.offsetUser = payload;
		},
		setAdmin: (initialState, { payload }) => {
			initialState.admin = payload;
		},
		setCountAdmin: (initialState, { payload }) => {
			initialState.countAdmin = payload;
		},
		setTotalPageAdmin: (initialState, { payload }) => {
			initialState.totalPageAdmin = payload;
		},
		setOrderFieldAdmin: (initialState, { payload }) => {
			initialState.orderFieldAdmin = payload;
		},
		setOrderDirectionAdmin: (initialState, { payload }) => {
			initialState.orderDirectionAdmin = payload;
		},
		setSearchAdmin: (initialState, { payload }) => {
			initialState.searchAdmin = payload;
		},
		resetPageAdmin: (initialState) => {
			initialState.pageAdmin = 1;
		},
		resetOffsetAdmin: (initialState) => {
			initialState.offsetAdmin = 0;
		},
		setPageAdmin: (initialState, { payload }) => {
			initialState.pageAdmin = payload;
		},
		setOffsetAdmin: (initialState, { payload }) => {
			initialState.offsetAdmin = payload;
		},
	},
});

export const fetchUser = (query) => async (dispatch) => {
	try {
		const acessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance(acessToken).get(
			`users/allDataUser${query ? query : ""}`
		);
		const totalPage = Math.ceil(data.data.count / 12);
		dispatch(setTotalPageUser(totalPage));

		dispatch(setUser(data.data.data));
		dispatch(setCountUser(data.data.count));
	} catch (error) {
		console.log(error);
	}
};
export const fetchAdmin = (query) => async (dispatch) => {
	try {
		const acessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance(acessToken).get(
			`users/allDataAdmin${query ? query : ""}`
		);
		const totalPage = Math.ceil(data.data.count / 12);
		dispatch(setTotalPageAdmin(totalPage));

		dispatch(setAdmin(data.data.data));
		dispatch(setCountAdmin(data.data.count));
	} catch (error) {
		console.log(error);
	}
};

export const onClearUser = () => async (dispatchEvent) => {
	try {
		dispatchEvent(resetPageUser());
		dispatchEvent(resetOffsetUser());
		dispatchEvent(setOrderFieldUser(""));
		dispatchEvent(setOrderDirectionUser(""));
		dispatchEvent(setSearchUser(""));
	} catch (error) {
		console.log(error);
	}
};
export const onClearAdmin = () => async (dispatchEvent) => {
	try {
		dispatchEvent(resetPageAdmin());
		dispatchEvent(resetOffsetAdmin());
		dispatchEvent(setOrderFieldAdmin(""));
		dispatchEvent(setOrderDirectionAdmin(""));
		dispatchEvent(setSearchAdmin(""));
	} catch (error) {
		console.log(error);
	}
};

export const setPaginationUser = (page, offset) => async (dispatchEvent) => {
	try {
		dispatchEvent(setPageUser(page));
		dispatchEvent(setOffsetUser(offset));
	} catch (error) {
		console.log(error);
	}
};
export const setPaginationAdmin = (page, offset) => async (dispatchEvent) => {
	try {
		dispatchEvent(setPageAdmin(page));
		dispatchEvent(setOffsetAdmin(offset));
	} catch (error) {
		console.log(error);
	}
};

export const onSearchUser = (search) => async (dispatchEvent) => {
	try {
		dispatchEvent(setSearchUser(search));
		dispatchEvent(resetPageUser());
		dispatchEvent(resetOffsetUser());
	} catch (error) {
		console.log(error);
	}
};
export const onSearchAdmin = (search) => async (dispatchEvent) => {
	try {
		dispatchEvent(setSearchAdmin(search));
		dispatchEvent(resetPageAdmin());
		dispatchEvent(resetOffsetAdmin());
	} catch (error) {
		console.log(error);
	}
};

export const onSortUser = (field, direction) => async (dispatchEvent) => {
	try {
		dispatchEvent(setOrderFieldUser(field));
		dispatchEvent(setOrderDirectionUser(direction));
		dispatchEvent(resetPageUser());
		dispatchEvent(resetOffsetUser());
	} catch (error) {
		console.log(error);
	}
};
export const onSortAdmin = (field, direction) => async (dispatchEvent) => {
	try {
		dispatchEvent(setOrderFieldAdmin(field));
		dispatchEvent(setOrderDirectionAdmin(direction));
		dispatchEvent(resetPageAdmin());
		dispatchEvent(resetOffsetAdmin());
	} catch (error) {
		console.log(error);
	}
};

export const {
	setCountUser,
	setSearchUser,
	setTotalPageUser,
	setOrderDirectionUser,
	setOrderFieldUser,
	setUser,
	resetOffsetUser,
	resetPageUser,
	setPageUser,
	setOffsetUser,
	setCountAdmin,
	setSearchAdmin,
	setTotalPageAdmin,
	setOrderDirectionAdmin,
	setOrderFieldAdmin,
	setAdmin,
	resetOffsetAdmin,
	resetPageAdmin,
	setPageAdmin,
	setOffsetAdmin,
} = manageUserSlice.actions;

export default manageUserSlice.reducer;
