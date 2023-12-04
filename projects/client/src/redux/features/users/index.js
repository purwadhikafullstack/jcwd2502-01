import { axiosInstance } from "./../../../lib/axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { setWarehouse } from "../products";
import { setWarehouseId } from "../orders";
import { Navigate, useNavigate } from "react-router-dom";

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

		localStorage.setItem("accessToken", checkUser.data.data.accessToken);

		setTimeout(() => {
			dispatch(login(checkUser.data.data));
		}, 1200);

		if (checkUser.data.data.role === "admin") {
			dispatch(setWarehouse(checkUser.data.data.warehouse_id));
			dispatch(setWarehouseId(checkUser.data.data.warehouse_id));
		}

		toast.success(`${checkUser.data.message}`, {
			style: {
				backgroundColor: "var(--background)",
				color: "var(--text)",
			},
		});

		return checkUser.data.data.role;
	} catch (error) {
		console.log(error);
	}
};

export const onRegisterAsync =
	(username, email, password) => async (dispatch) => {
		try {
			dispatch(setIsLoading(true));

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
					"Registration complete! \n Check your email to verify your account.",
					{
						style: {
							backgroundColor: "var(--background)",
							color: "var(--text)",
						},
					}
				);

				dispatch(setIsLoading(false));
				dispatch(setIsLogin(true));
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

		dispatch(setIsLogin(true));
		dispatch(login(CheckToken.data.data));

		if (CheckToken.data.data.role === "admin") {
			dispatch(setWarehouse(CheckToken.data.data.warehouse_id));
			dispatch(setWarehouseId(CheckToken.data.data.warehouse_id));
		}
	} catch (error) {
		if (
			error.response.data.isError &&
			localStorage.getItem("accessToken")
		) {
			localStorage.removeItem("accessToken");
			toast.error("Your account has expired!", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});

			setTimeout(() => {
				window.location.reload(false);
			}, 1000);
		} else {
			console.log(error);
		}
	}
};

export const onSetUserAddresses =
	(token, search = "") =>
	async (dispatch) => {
		try {
			const { data } = await axiosInstance(token).get(
				`user-addresses?search=${search}`
			);

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
		dispatch(setIsLoading(true));

		if (!password) {
			dispatch(setIsLoading(false));

			return toast.error("Please fill out this field.", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
		} else if (password.length < 6) {
			dispatch(setIsLoading(false));

			return toast.error("Password must be at least 6 characters long", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
		}

		const statusUser = await axiosInstance(
			token,
			password,
			null,
			"verified"
		).patch("/users/verifyStatus");

		if (statusUser.data.isError) {
			dispatch(setIsLoading(false));

			return toast.error(`${statusUser.data.message}`, {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
		}

		dispatch(setIsLoading(false));
		dispatch(setStatus("verified"));

		toast.success(`${statusUser.data.message}`, {
			style: {
				backgroundColor: "var(--background)",
				color: "var(--text)",
			},
		});

		setTimeout(() => {
			dispatch(setIsLogin(true));
		}, 1500);

		return { navigate: true };
	} catch (error) {
		console.log(error);
	}
};

export const resetPassword = (token, newpass, conpass) => async (dispatch) => {
	try {
		dispatch(setIsLoading(true));

		if (newpass !== conpass) {
			dispatch(setIsLoading(false));

			return toast.error("Passwords do not match!", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
		}

		const changePass = await axiosInstance(
			token,
			newpass,
			conpass,
			"reset"
		).patch("/users/changePass");

		if (changePass.data.isError) {
			dispatch(setIsLoading(false));

			return toast.error("Change password is failed!", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
		}

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

		dispatch(setIsLoading(false));

		return { navigate: true };
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
