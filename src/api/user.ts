import axios from 'axios';

import { IApiResponse, ILogin, ISignup } from 'utils/types';
import { CONSTANTS } from 'utils/constant';
import handleAxiosError from 'utils/handleAxiosError';
import Cookies from 'js-cookie';

export const signupUser = async (data: ISignup): Promise<IApiResponse> => {
    try {
        const response = await axios.post<IApiResponse>(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.USER}`, data);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const loginUser = async (data: ILogin): Promise<IApiResponse> => {
    try {
        const response = await axios.post<IApiResponse>(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.LOGIN}`, data);
        if (response.data.success) {
            const token = response.data.data;
            const expirationTime = CONSTANTS.TOKEN_EXPIRE;
            Cookies.set('token', token, { expires: new Date(Date.now() + expirationTime) });
        }
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};
