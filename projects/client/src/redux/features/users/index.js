import { axiosInstance } from "./../../../lib/axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
	username: "",
	profileUser: "",
	email: "",
	role: "",
	isLogin: false,
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
		login: (state, action) => {
			return (state = {
				...state,
				...action.payload,
			});
		},
		logout: (state, action) => {
			return (state = initialState);
		},
	},
});

export const onLoginAsync = (email, password) => async (dispatch) => {
	try {
		// console.log(email);
		// console.log(password);
		// const hasSymbol = email.indexOf("@");
		// const hasDot = email.indexOf(".");

		// if (!email || !password) {
		// 	return toast.error("Please fill out this field.");
		// } else if (hasSymbol === -1 || hasDot === -1) {
		// 	return toast.error("Please provide a valid email address.");
		// } else if (password.length < 6) {
		// 	return toast.error(
		// 		"The Password must be at least 6 characters long"
		// 	);
		// }

		const checkUser = await axiosInstance().post("/users/login", {
			email: email,
			password: password,
		});
		console.log(checkUser);
		if (checkUser.data.isError)
			return toast.error(`${checkUser.data.message}`);

		setTimeout(() => {
			localStorage.setItem(
				"accessToken",
				checkUser.data.data.accessToken
			);
			dispatch(setRole(checkUser.data.data.role));
			dispatch(setUsername(checkUser.data.data.username));
			dispatch(setProfileUser(checkUser.data.data.profileUser));
			dispatch(setEmail(checkUser.data.data.email));
			// dispatch(login(checkUser.data.data));
		}, 1200);
		toast.success(`${checkUser.data.message}`);
	} catch (error) {
		console.log(error);
	}
};

export const onRegisterAsync =
	(username, email, password) => async (dispatch) => {
		try {
			console.log(username);
			console.log(email);
			console.log(password);
			const hasSymbol = email.indexOf("@");
			const hasDot = email.indexOf(".");

			if (!email || !password || !username) {
				return toast.error("Please fill out this field.");
			} else if (hasSymbol === -1 || hasDot === -1) {
				return toast.error("Please provide a valid email address.");
			} else if (password.length < 6) {
				return toast.error(
					"The Password must be at least 6 characters long"
				);
			}

			const checkUser = await axiosInstance().post("/users/register", {
				username: username,
				email: email,
				password: password,
			});
			console.log(checkUser.data);
			if (checkUser.data.isError) {
				return toast.error(checkUser.data.message);
			} else {
				toast.success(
					"Registration successful. Please verify your account!"
				);
				return setTimeout(() => {
					dispatch(setIsLogin(true));
				}, 2500);
			}
		} catch (error) {
			console.log(error);
		}
	};

export const OnCheckIsLogin = () => async (dispatch) => {
	try {
		const accessToken = localStorage.getItem("accessToken");

		const CheckToken = await axiosInstance(accessToken).get(
			"/users/verifyAccess"
		);
		console.log(CheckToken);
		dispatch(setUsername(CheckToken.data.data.username));
		dispatch(setEmail(CheckToken.data.data.email));
		dispatch(setProfileUser(CheckToken.data.data.image));
		dispatch(setRole(CheckToken.data.data.role));
	} catch (error) {
		if (error.response.data.isError && localStorage.getItem("tokenLogin")) {
			localStorage.removeItem("tokenLogin");
			toast.error("your account is expired");
		} else {
			console.log(error);
		}
	}
};

export const onLogout = () => async (dispatch) => {
	try {
		localStorage.removeItem("accessToken");
		dispatch(setProfileUser(""));
		dispatch(setProfileUser(""));
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

		toast.success(`${statusUser.data.message}`);
		setTimeout(() => {
			toast.success("Now try to login");
		}, 1000);
		setTimeout(() => {
			dispatch(setIsLogin(true));
		}, 1500);
	} catch (error) {
		console.log(error);
	}
};

export const {
	setUsername,
	setProfileUser,
	setRole,
	setEmail,
	setIsLogin,
	login,
} = userSlice.actions;
export default userSlice.reducer;
