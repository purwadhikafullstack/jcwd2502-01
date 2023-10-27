import axios from "axios";

function ApiInstance(
	authorization = null,
	password = null,
	confirmPassword = null,
	tokentype = null
) {
	return axios.create({
		baseURL: process.env.REACT_APP_API_BASE_URL,
		headers: {
			authorization,
			password,
			confirmPassword,
			tokentype,
		},
	});
}

export const axiosInstance = ApiInstance;
