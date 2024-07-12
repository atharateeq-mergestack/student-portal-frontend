import axiosInstance from 'utils/axiosInstance';
import { IApiResponse, ICreateSubject } from 'utils/interface';
import { CONSTANTS } from 'utils/constant';
import axios from 'axios';

export const createSubject = async (data: ICreateSubject): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.post<IApiResponse>(
            CONSTANTS.ENDPOINTS.SUBJECT, 
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


export const fetchSubjects = async (): Promise<IApiResponse> => {
    try {
        const response = await axiosInstance.get<IApiResponse>(CONSTANTS.ENDPOINTS.SUBJECT);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data ?? new Error('Network Error');
        } else {
            throw new Error('Network Error');
        }
    }
};

