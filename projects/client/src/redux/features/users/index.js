import { axiosInstance } from "./../../../lib/axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { setWarehouse } from "../products";

const initialState = {
	username: "",
	profileUser: "",
	email: "",
	role: "",
	isLogin: false,
	selectedUserAddressIdMain: null,
	selectedUserAddressId: null,
	userAddresses: [],
	status: "unverified",
	gender: "",
	birth_date: "",
	phone: "",
	theme: "",
	dataUser: [],
	isLoading: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUsername: (initialState, action) => {
			initialState.username = action.payload;
		},
		setProfileUser: (initialState, action) => {
			initialState.profileUser = action.payload;
		},
		setEmail: (initialState, action) => {
			initialState.email = action.payload;
		},
		setRole: (initialState, action) => {
			initialState.role = action.payload;
		},
		setIsLogin: (initialState, action) => {
			initialState.isLogin = action.payload;
		},
		setSelectedUserAddressId: (initialState, { payload }) => {
			initialState.selectedUserAddressId = payload;
		},
		setSelectedUserAddressIdMain: (initialState, { payload }) => {
			initialState.selectedUserAddressIdMain = payload;
		},
		setUserAddresses: (initialState, { payload }) => {
			initialState.userAddresses = payload;
		},
		setStatus: (initialState, { payload }) => {
			initialState.status = payload;
		},
		setThemeUser: (initialState, { payload }) => {
			initialState.theme = payload;
		},
		setDataUser: (initialState, { payload }) => {
			initialState.dataUser = payload;
		},
		setIsLoading: (initialState, { payload }) => {
			initialState.isLoading = payload;
		},

		login: (state, action) => {
			return (state = {
				...state,
				...action.payload,
			});
		},
		reset: (state, action) => {
			return initialState;
		},
		logout: (state, action) => {
			return (state = initialState);
		},
	},
});

export const onLoginAsync = (email, password) => async (dispatch) => {
	try {
		dispatch(setIsLoading(true));

		const checkUser = await axiosInstance().post("/users/login", {
			email: email,
			password: password,
		});

		if (checkUser.data.isError) {
			dispatch(setIsLoading(false));

			return toast.error(`${checkUser.data.message}`, {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
		}

		setTimeout(() => {
			localStorage.setItem(
				"accessToken",
				checkUser.data.data.accessToken
			);

			dispatch(login(checkUser.data.data));
			if (checkUser.data.data.role === "admin") {
				dispatch(setWarehouse(checkUser.data.data.warehouse_id));
			}
		}, 1200);
		toast.success(`${checkUser.data.message}`, {
			style: {
				backgroundColor: "var(--background)",
				color: "var(--text)",
			},
		});
	} catch (error) {
		console.log(error);
	}
};

export const onRegisterAsync =
	(username, email, password) => async (dispatch) => {
		try {
			dispatch(setIsLoading(true));
			console.log(username);
			console.log(email);
			console.log(password);
			const hasSymbol = email.indexOf("@");
			const hasDot = email.indexOf(".");
			if (username < 6) {
				return;
			} else if (!email || !password || !username) {
				dispatch(setIsLoading(false));
				return toast.error("Please fill out this field.", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
			} else if (hasSymbol === -1 || hasDot === -1) {
				dispatch(setIsLoading(false));
				return toast.error("Please provide a valid email address.", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
			} else if (password.length < 6) {
				dispatch(setIsLoading(false));
				return toast.error(
					"The Password must be at least 6 characters long",
					{
						style: {
							backgroundColor: "var(--background)",
							color: "var(--text)",
						},
					}
				);
			}

			const checkUser = await axiosInstance().post("/users/register", {
				username: username,
				email: email,
				password: password,
			});
			console.log(checkUser.data);
			if (checkUser.data.isError) {
				dispatch(setIsLoading(false));
				return toast.error(checkUser.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
			} else {
				toast.success(
					"Registration successful. Please verify your account!",
					{
						style: {
							backgroundColor: "var(--background)",
							color: "var(--text)",
						},
					}
				);
				return setTimeout(() => {
					dispatch(setIsLogin(true));
				}, 2500);
			}
		} catch (error) {
			if (error.response.data.isError) {
				dispatch(setIsLoading(false));
				return toast.error(`${error.response.data.message}`, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
			} else {
				console.log(error);
			}
		}
	};

export const OnCheckIsLogin = () => async (dispatch) => {
	try {
		const accessToken = localStorage.getItem("accessToken");

		const CheckToken = await axiosInstance(accessToken).get(
			"/users/verifyAccess"
		);

		dispatch(login(CheckToken.data.data));
		if (CheckToken.data.data.role === "admin") {
			dispatch(setWarehouse(CheckToken.data.data.warehouse_id));
		}
	} catch (error) {
		if (error.response.data.isError && localStorage.getItem("tokenLogin")) {
			localStorage.removeItem("tokenLogin");
			toast.error("your account is expired");
		} else {
			console.log(error);
		}
	}
};

export const onSetUserAddresses = (token) => async (dispatch) => {
	try {
		const { data } = await axiosInstance(token).get(`user-addresses`);

		data.data?.map((address) => {
			if (address.is_default === true) {
				dispatch(setSelectedUserAddressIdMain(address.id));
				dispatch(onSetSelectedUserAddressId(address.id));
				return;
			}
		});

		dispatch(setUserAddresses(data.data));
	} catch (error) {
		console.log(error);
	}
};

export const onSetSelectedUserAddressId = (address) => async (dispatch) => {
	try {
		dispatch(setSelectedUserAddressId(address));
	} catch (error) {
		console.log(error);
	}
};

export const onLogout = () => async (dispatch) => {
	try {
		localStorage.removeItem("accessToken");
		dispatch(setProfileUser(""));
		dispatch(setEmail(""));
		dispatch(setRole(""));
		dispatch(setUsername(""));
	} catch (error) {
		console.log(error);
	}
};

export const verifyUser = (password, token) => async (dispatch) => {
	try {
		if (!password) {
			return toast.error("Please fill out this field.");
		} else if (password.length < 6) {
			return toast.error(
				"The Password must be at least 6 characters long"
			);
		}

		const statusUser = await axiosInstance(
			token,
			password,
			null,
			"verified"
		).patch("/users/verifyStatus");
		console.log(statusUser);
		if (statusUser.data.isError)
			return toast.error(`${statusUser.data.message}`);
		dispatch(setStatus("verified"));
		toast.success(`${statusUser.data.message}`, {
			style: {
				backgroundColor: "var(--background)",
				color: "var(--text)",
			},
		});
		// setTimeout(() => {
		// 	toast.success("Now try to login");
		// }, 1000);
		setTimeout(() => {
			dispatch(setIsLogin(true));
		}, 1500);
	} catch (error) {
		console.log(error);
	}
};

export const resetPassword = (token, newpass, conpass) => async (dispatch) => {
	try {
		if (newpass !== conpass) return toast.error("password must be same!");
		const changePass = await axiosInstance(
			token,
			newpass,
			conpass,
			"reset"
		).patch("/users/changePass");
		if (changePass.data.isError)
			return toast.error("Change password is failed!");
		setTimeout(() => {
			localStorage.removeItem("accessToken");
			dispatch(reset());
			dispatch(setIsLogin(true));
		}, 1500);
		toast.success(`${changePass.data.message}, now login!`, {
			style: {
				backgroundColor: "var(--background)",
				color: "var(--text)",
			},
		});
	} catch (error) {
		console.log(error);
	}
};

export const getDataUser = () => async (dispatch) => {
	try {
	} catch (error) {
		console.log(error);
	}
};

export const {
	setUsername,
	setProfileUser,
	setRole,
	setEmail,
	setSelectedUserAddressId,
	setUserAddresses,
	setIsLogin,
	login,
	reset,
	setThemeUser,
	setSelectedUserAddressIdMain,
	setStatus,
	setDataUser,
	setIsLoading,
} = userSlice.actions;
export default userSlice.reducer;
