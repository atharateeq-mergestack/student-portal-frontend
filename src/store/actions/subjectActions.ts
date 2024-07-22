import { Dispatch } from 'redux';

import { ICreateSubject } from 'utils/types';
import {
  FETCH_SUBJECTS_REQUEST,
  FETCH_SUBJECTS_SUCCESS,
  FETCH_SUBJECTS_FAILURE,
  CREATE_SUBJECT_REQUEST,
  CREATE_SUBJECT_SUCCESS,
  CREATE_SUBJECT_FAILURE,
} from 'store/actions/actionTypes';
import { createSubject, fetchSubjects } from 'api/subject';
import showToast from 'utils/toastMessage';

export const fetchSubjectsAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_SUBJECTS_REQUEST });
  try {
    const response = await fetchSubjects();
    dispatch({ type: FETCH_SUBJECTS_SUCCESS, payload: response.data });
  } catch (error: any) {
    showToast(error);
    dispatch({ type: FETCH_SUBJECTS_FAILURE, error: error.message });
  }
};

export const createSubjectAction = (subject: ICreateSubject) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_SUBJECT_REQUEST });
  try {
    const response = await createSubject(subject);
    dispatch({ type: CREATE_SUBJECT_SUCCESS, payload: response.data });
    showToast(response);
  } catch (error: any) {
    showToast(error);
    dispatch({ type: CREATE_SUBJECT_FAILURE, error: error.message });
  }
};
