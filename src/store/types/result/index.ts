import { ICreateResult, IResultData } from "utils/types";
import { RESULTS_API, CREATE_RESULT_API, UPDATE_RESULT_API, DELETE_RESULT_API } from 'store/types';

interface IFetchResultsRequest {
  type: typeof RESULTS_API.STARTED;
}

interface IFetchResultsSuccess {
  type: typeof RESULTS_API.FULLFILLED;
  payload: IResultData[];
}

interface IFetchResultsFailure {
  type: typeof RESULTS_API.REJECTED;
  error: string;
}

interface ICreateResultRequest {
  type: typeof CREATE_RESULT_API.STARTED;
  payload: ICreateResult;
}

interface ICreateResultSuccess {
  type: typeof CREATE_RESULT_API.FULLFILLED;
  payload: IResultData;
}

interface ICreateResultFailure {
  type: typeof CREATE_RESULT_API.REJECTED;
  error: string;
}

interface IUpdateResultRequest {
  type: typeof UPDATE_RESULT_API.STARTED;
  payload: IResultData;
}

interface IUpdateResultSuccess {
  type: typeof UPDATE_RESULT_API.FULLFILLED;
  payload: IResultData;
}

interface IUpdateResultFailure {
  type: typeof UPDATE_RESULT_API.REJECTED;
  error: string;
}

interface IDeleteResultRequest {
  type: typeof DELETE_RESULT_API.STARTED;
  payload: string;
}

interface IDeleteResultSuccess {
  type: typeof DELETE_RESULT_API.FULLFILLED;
  payload: string;
}

interface IDeleteResultFailure {
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
