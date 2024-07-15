import axiosInstance from 'utils/axiosInstance';
import { IApiResponse, ICreateResult } from 'utils/interface';
import { CONSTANTS } from 'utils/constant';
import axios from 'axios';

export const createResult = async (data: ICreateResult): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.post<IApiResponse>(
            CONSTANTS.ENDPOINTS.RESULT, 
            data
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data ?? new Error('Network Error');
        } else {
            throw new Error('Network Error');
        }
    }
};

export const getResult = async (): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.get<IApiResponse>(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.GET_RESULT}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data ?? new Error('Network Error');
        } else {
            throw new Error('Network Error');
        }
    }
};

export const updateResult = async (id : string = '', data: ICreateResult): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.put<IApiResponse>(
            `${CONSTANTS.ENDPOINTS.RESULT}/${id}`, 
            data
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data ?? new Error('Network Error');
        } else {
            throw new Error('Network Error');
        }
    }
};

export const deleteResult = async (id : string = ''): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.delete<IApiResponse>(
            `${CONSTANTS.ENDPOINTS.RESULT}/${id}`, 
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data ?? new Error('Network Error');
        } else {
            throw new Error('Network Error');
        }
    }
};