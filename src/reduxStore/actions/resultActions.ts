import { ICreateResult, IResultData } from 'utils/types';
import {
  FETCH_RESULTS_REQUEST,
  FETCH_RESULTS_SUCCESS,
  FETCH_RESULTS_FAILURE,
  CREATE_RESULT_REQUEST,
  CREATE_RESULT_SUCCESS,
  CREATE_RESULT_FAILURE,
  UPDATE_RESULT_REQUEST,
  UPDATE_RESULT_SUCCESS,
  UPDATE_RESULT_FAILURE,
  DELETE_RESULT_REQUEST,
  DELETE_RESULT_SUCCESS,
  DELETE_RESULT_FAILURE,
} from 'reduxStore/actions/actionTypes';

export const fetchResultsRequest = () => ({ type: FETCH_RESULTS_REQUEST });
export const fetchResultsSuccess = (results: IResultData[]) => ({ type: FETCH_RESULTS_SUCCESS, payload: results });
export const fetchResultsFailure = (error: string) => ({ type: FETCH_RESULTS_FAILURE, error });

export const createResultRequest = (result: ICreateResult) => ({ type: CREATE_RESULT_REQUEST, payload: result });
export const createResultSuccess = (result: IResultData) => ({ type: CREATE_RESULT_SUCCESS, payload: result });
export const createResultFailure = (error: string) => ({ type: CREATE_RESULT_FAILURE, error });

export const updateResultRequest = (result: ICreateResult) => ({ type: UPDATE_RESULT_REQUEST, payload: result });
export const updateResultSuccess = (result: IResultData) => ({ type: UPDATE_RESULT_SUCCESS, payload: result });
export const updateResultFailure = (error: string) => ({ type: UPDATE_RESULT_FAILURE, error });

export const deleteResultRequest = (id: IResultData) => ({ type: DELETE_RESULT_REQUEST, payload: id });
export const deleteResultSuccess = (id: string) => ({ type: DELETE_RESULT_SUCCESS, payload: id });
export const deleteResultFailure = (error: string) => ({ type: DELETE_RESULT_FAILURE, error });
