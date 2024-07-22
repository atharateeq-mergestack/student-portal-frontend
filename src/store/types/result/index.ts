import { ICreateResult, IResultData } from "utils/types";
import { RESULTS_API, CREATE_RESULT_API, UPDATE_RESULT_API, DELETE_RESULT_API } from 'store/types';

export interface IFetchResultsRequest {
  type: typeof RESULTS_API.STARTED;
}

export interface IFetchResultsSuccess {
  type: typeof RESULTS_API.FULLFILLED;
  payload: IResultData[];
}

export interface IFetchResultsFailure {
  type: typeof RESULTS_API.REJECTED;
  error: string;
}

export interface ICreateResultRequest {
  type: typeof CREATE_RESULT_API.STARTED;
  payload: ICreateResult;
}

export interface ICreateResultSuccess {
  type: typeof CREATE_RESULT_API.FULLFILLED;
  payload: IResultData;
}

export interface ICreateResultFailure {
  type: typeof CREATE_RESULT_API.REJECTED;
  error: string;
}

export interface IUpdateResultRequest {
  type: typeof UPDATE_RESULT_API.STARTED;
  payload: IResultData;
}

export interface IUpdateResultSuccess {
  type: typeof UPDATE_RESULT_API.FULLFILLED;
  payload: IResultData;
}

export interface IUpdateResultFailure {
  type: typeof UPDATE_RESULT_API.REJECTED;
  error: string;
}

export interface IDeleteResultRequest {
  type: typeof DELETE_RESULT_API.STARTED;
  payload: string;
}

export interface IDeleteResultSuccess {
  type: typeof DELETE_RESULT_API.FULLFILLED;
  payload: string;
}

export interface IDeleteResultFailure {
  type: typeof DELETE_RESULT_API.REJECTED;
  error: string;
}

export type ResultAction = IFetchResultsRequest
  | IFetchResultsSuccess
  | IFetchResultsFailure
  | ICreateResultRequest
  | ICreateResultSuccess
  | ICreateResultFailure
  | IUpdateResultRequest
  | IUpdateResultSuccess
  | IUpdateResultFailure
  | IDeleteResultRequest
  | IDeleteResultSuccess
  | IDeleteResultFailure;
