import axios from 'axios';
import Cookies from 'js-cookie';
import { CONSTANTS } from 'utils/constant';

const axiosInstance = axios.create({
    baseURL: CONSTANTS.BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token?.length) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        else{
            window.location.replace("http://localhost:3000/");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
