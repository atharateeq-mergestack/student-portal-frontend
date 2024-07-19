import axios from 'axios';

export const handleAxiosError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        throw error.response?.data ?? new Error('Network Error');
    } else {
        throw new Error('Network Error');
    }
};

export default handleAxiosError;
