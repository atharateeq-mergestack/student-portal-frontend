import axios from 'axios';
import Cookies from 'js-cookie';
import { CONSTANTS } from 'utils/constant';

const axiosInstance = axios.create({
    baseURL: CONSTANTS.BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
