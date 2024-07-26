import axios from 'axios';
import Cookies from 'js-cookie';


export const handleAxiosError = (error: any): never => {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            Cookies.remove('token');
            window.location.replace("http://localhost:3000/");
        }

        throw error.response?.data ?? new Error('Network Error');
    } else {
        throw new Error('Network Error');
    }
};

export default handleAxiosError;
