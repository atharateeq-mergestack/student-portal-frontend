import { IApiResponse, ICreateResult, IResultData } from 'utils/types';
import { CONSTANTS } from 'utils/constant';
import axiosInstance from 'utils/axiosInstance';
import handleAxiosError from 'utils/handleAxiosError';

export const createResult = async (data: ICreateResult): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.post<IApiResponse>(
            CONSTANTS.ENDPOINTS.RESULT, 
            data
        );
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const getResult = async (): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.get<IApiResponse>(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.GET_RESULT}`);
        return response.data;
    } catch (error) {
       return handleAxiosError(error);
    }
};

export const updateResult = async (data: ICreateResult): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.put<IApiResponse>(
            `${CONSTANTS.ENDPOINTS.RESULT}/${data._id}`, 
            data
        );
        return response.data;
    } catch (error) {
       return handleAxiosError(error);
    }
};

export const deleteResult = async (data: IResultData): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.delete<IApiResponse>(
            `${CONSTANTS.ENDPOINTS.RESULT}/${data._id}`, 
        );
        return response.data;
    } catch (error) {
       return handleAxiosError(error);
    }
};

export const fetchResultById = async (data: string): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.get<IApiResponse>(
            `${CONSTANTS.ENDPOINTS.RESULT}/${data}`, 
        );
        return response.data;
    } catch (error) {
       return handleAxiosError(error);
    }
};
