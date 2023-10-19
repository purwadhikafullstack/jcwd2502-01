import { axiosInstance } from "./../../../lib/axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
	username: "",
	profileUser: "",
	email: "",
	role: "",
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
	},
});

export const onLoginAsync = (email, password) => async (dispatch) => {
	try {
		console.log(email);
		console.log(password);
		const hasSymbol = email.indexOf("@");
		const hasDot = email.indexOf(".");

		if (!email || !password) {
			return toast.error("Please fill out this field.");
		} else if (hasSymbol === -1 || hasDot === -1) {
			return toast.error("Please provide a valid email address.");
		} else if (password.length < 6) {
			return toast.error(
				"The Password must be at least 6 characters long"
			);
		}
	} catch (error) {}
};

export const { setUsername, setProfileUser, setRole, setEmail } =
	userSlice.actions;
export default userSlice.reducer;
