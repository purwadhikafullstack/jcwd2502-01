import axios from "axios";

function ApiInstance(authorization = null) {
	return axios.create({
		baseURL: "http://localhost:8000/api",
		headers: {
			authorization,
		},
	});
}

export const axiosInstance = ApiInstance;
