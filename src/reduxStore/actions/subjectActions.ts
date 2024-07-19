import { ICreateSubject, ISubject } from 'utils/types';
import {
  FETCH_SUBJECTS_REQUEST,
  FETCH_SUBJECTS_SUCCESS,
  FETCH_SUBJECTS_FAILURE,
  CREATE_SUBJECT_REQUEST,
  CREATE_SUBJECT_SUCCESS,
  CREATE_SUBJECT_FAILURE,
} from 'reduxStore/actions/actionTypes';

export const fetchSubjectsRequest = () => ({ type: FETCH_SUBJECTS_REQUEST });
export const fetchSubjectsSuccess = (subjects: ISubject[]) => ({ type: FETCH_SUBJECTS_SUCCESS, payload: subjects });
export const fetchSubjectsFailure = (error: string) => ({ type: FETCH_SUBJECTS_FAILURE, error });

export const createSubjectRequest = (subject: ICreateSubject) => ({ type: CREATE_SUBJECT_REQUEST, payload: subject });
export const createSubjectSuccess = (subject: ISubject) => ({ type: CREATE_SUBJECT_SUCCESS, payload: subject });
export const createSubjectFailure = (error: string) => ({ type: CREATE_SUBJECT_FAILURE, error });
