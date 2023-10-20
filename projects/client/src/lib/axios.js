import axios from "axios";

function ApiInstance(authorization = null) {
	return axios.create({
		baseURL: process.env.REACT_APP_API_BASE_URL,
		headers: {
			authorization,
		},
	});
}

export const axiosInstance = ApiInstance;
