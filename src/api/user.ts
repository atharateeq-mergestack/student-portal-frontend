import axios from 'axios';
import { IApiResponse, ILogin, ISignup } from 'utils/interface';
import { CONSTANTS } from 'utils/constant';

export const signupUser = async (data: ISignup): Promise<IApiResponse> => {
    try {
        const response = await axios.post<IApiResponse>(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.USER}`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data ?? new Error('Network Error');
        } else {
            throw new Error('Network Error');
        }
    }
};

export const loginUser = async (data: ILogin): Promise<IApiResponse> => {
    try {
        const response = await axios.post<IApiResponse>(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.LOGIN}`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data ?? new Error('Network Error');
        } else {
            throw new Error('Network Error');
        }
    }
};
