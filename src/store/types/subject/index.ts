import { ICreateSubject, ISubject } from "utils/types";
import { SUBJECTS_API, CREATE_SUBJECT_API } from 'store/types';

interface IFetchSubjectsRequest {
  type: typeof SUBJECTS_API.STARTED;
}

interface IFetchSubjectsSuccess {
  type: typeof SUBJECTS_API.FULLFILLED;
  payload: ISubject[];
}

interface IFetchSubjectsFailure {
  type: typeof SUBJECTS_API.REJECTED;
  error: string;
}

interface ICreateSubjectRequest {
  type: typeof CREATE_SUBJECT_API.STARTED;
  payload: ICreateSubject;
}

interface ICreateSubjectSuccess {
  type: typeof CREATE_SUBJECT_API.FULLFILLED;
  payload: ISubject;
}

interface ICreateSubjectFailure {
  type: typeof CREATE_SUBJECT_API.REJECTED;
  error: string;
}

export type SubjectAction = IFetchSubjectsRequest 
  | IFetchSubjectsSuccess 
  | IFetchSubjectsFailure 
  | ICreateSubjectRequest 
  | ICreateSubjectSuccess 
  | ICreateSubjectFailure;