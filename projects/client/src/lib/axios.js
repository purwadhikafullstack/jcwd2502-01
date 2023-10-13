import axios from "axios";

function ApiInstance(authorization = null) {
    return axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_URL,
        headers: {
            authorization,
        },
    });
}

export const axiosInstance = ApiInstance;
