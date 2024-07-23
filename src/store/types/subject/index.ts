import { ICreateSubject, ISubject } from "utils/types";
import { SUBJECTS_API, CREATE_SUBJECT_API } from 'store/types';

export interface IFetchSubjectsRequest {
  type: typeof SUBJECTS_API.STARTED;
}

export interface IFetchSubjectsSuccess {
  type: typeof SUBJECTS_API.FULLFILLED;
  payload: ISubject[];
}

export interface IFetchSubjectsFailure {
  type: typeof SUBJECTS_API.REJECTED;
  error: string;
}

export interface ICreateSubjectRequest {
  type: typeof CREATE_SUBJECT_API.STARTED;
  payload: ICreateSubject;
}

export interface ICreateSubjectSuccess {
  type: typeof CREATE_SUBJECT_API.FULLFILLED;
  payload: ISubject;
}

export interface ICreateSubjectFailure {
  type: typeof CREATE_SUBJECT_API.REJECTED;
  error: string;
}

export type SubjectAction = IFetchSubjectsRequest 
  | IFetchSubjectsSuccess 
  | IFetchSubjectsFailure 
  | ICreateSubjectRequest 
  | ICreateSubjectSuccess 
  | ICreateSubjectFailure;
