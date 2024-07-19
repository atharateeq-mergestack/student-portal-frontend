import { IApiResponse, ICreateSubject } from 'utils/types';
import { CONSTANTS } from 'utils/constant';
import axiosInstance from 'utils/axiosInstance';
import handleAxiosError from 'utils/handleAxiosError';

export const createSubject = async (data: ICreateSubject): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.post<IApiResponse>(
            CONSTANTS.ENDPOINTS.SUBJECT, 
            data
        );
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const fetchSubjects = async (): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.get<IApiResponse>(CONSTANTS.ENDPOINTS.SUBJECT);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};
