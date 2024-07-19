import { ICreateResult, ICreateSubject, IResultData, ISubject } from "utils/types";

export const FETCH_SUBJECTS_REQUEST = 'FETCH_SUBJECTS_REQUEST';
export const FETCH_SUBJECTS_SUCCESS = 'FETCH_SUBJECTS_SUCCESS';
export const FETCH_SUBJECTS_FAILURE = 'FETCH_SUBJECTS_FAILURE';

export const CREATE_SUBJECT_REQUEST = 'CREATE_SUBJECT_REQUEST';
export const CREATE_SUBJECT_SUCCESS = 'CREATE_SUBJECT_SUCCESS';
export const CREATE_SUBJECT_FAILURE = 'CREATE_SUBJECT_FAILURE';

export const FETCH_RESULTS_REQUEST = 'FETCH_RESULTS_REQUEST';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
export const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE';

export const CREATE_RESULT_REQUEST = 'CREATE_RESULT_REQUEST';
export const CREATE_RESULT_SUCCESS = 'CREATE_RESULT_SUCCESS';
export const CREATE_RESULT_FAILURE = 'CREATE_RESULT_FAILURE';

export const UPDATE_RESULT_REQUEST = 'UPDATE_RESULT_REQUEST';
export const UPDATE_RESULT_SUCCESS = 'UPDATE_RESULT_SUCCESS';
export const UPDATE_RESULT_FAILURE = 'UPDATE_RESULT_FAILURE';

export const DELETE_RESULT_REQUEST = 'DELETE_RESULT_REQUEST';
export const DELETE_RESULT_SUCCESS = 'DELETE_RESULT_SUCCESS';
export const DELETE_RESULT_FAILURE = 'DELETE_RESULT_FAILURE';

// Subject Action Types
interface FetchSubjectsRequest {
  type: typeof FETCH_SUBJECTS_REQUEST;
}

interface FetchSubjectsSuccess {
  type: typeof FETCH_SUBJECTS_SUCCESS;
  payload: ISubject[];
}

interface FetchSubjectsFailure {
  type: typeof FETCH_SUBJECTS_FAILURE;
  error: string;
}

interface CreateSubjectRequest {
  type: typeof CREATE_SUBJECT_REQUEST;
  payload: ICreateSubject;
}

interface CreateSubjectSuccess {
  type: typeof CREATE_SUBJECT_SUCCESS;
  payload: ISubject;
}

interface CreateSubjectFailure {
  type: typeof CREATE_SUBJECT_FAILURE;
  error: string;
}

export type SubjectAction = FetchSubjectsRequest 
  | FetchSubjectsSuccess 
  | FetchSubjectsFailure 
  | CreateSubjectRequest 
  | CreateSubjectSuccess 
  | CreateSubjectFailure;

// Result Action Types
interface FetchResultsRequest {
  type: typeof FETCH_RESULTS_REQUEST;
}

interface FetchResultsSuccess {
  type: typeof FETCH_RESULTS_SUCCESS;
  payload: IResultData[];
}

interface FetchResultsFailure {
  type: typeof FETCH_RESULTS_FAILURE;
  error: string;
}

interface CreateResultRequest {
  type: typeof CREATE_RESULT_REQUEST;
  payload: ICreateResult;
}

interface CreateResultSuccess {
  type: typeof CREATE_RESULT_SUCCESS;
  payload: IResultData;
}

interface CreateResultFailure {
  type: typeof CREATE_RESULT_FAILURE;
  error: string;
}

interface UpdateResultRequest {
  type: typeof UPDATE_RESULT_REQUEST;
  payload: IResultData;
}

interface UpdateResultSuccess {
  type: typeof UPDATE_RESULT_SUCCESS;
  payload: IResultData;
}

interface UpdateResultFailure {
  type: typeof UPDATE_RESULT_FAILURE;
  error: string;
}

interface DeleteResultRequest {
  type: typeof DELETE_RESULT_REQUEST;
  payload: string;
}

interface DeleteResultSuccess {
  type: typeof DELETE_RESULT_SUCCESS;
  payload: string;
}

interface DeleteResultFailure {
  type: typeof DELETE_RESULT_FAILURE;
  error: string;
}

export type ResultAction = FetchResultsRequest
  | FetchResultsSuccess
  | FetchResultsFailure
  | CreateResultRequest
  | CreateResultSuccess
  | CreateResultFailure
  | UpdateResultRequest
  | UpdateResultSuccess
  | UpdateResultFailure
  | DeleteResultRequest
  | DeleteResultSuccess
  | DeleteResultFailure;
