import { Dispatch } from 'redux';

import { ICreateSubject } from 'utils/types';
import { SUBJECTS_API, CREATE_SUBJECT_API } from 'store/types';
import { createSubject, fetchSubjects } from 'api/subject';
import showToast from 'utils/toastMessage';

export const fetchSubjectsAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: SUBJECTS_API.STARTED });
  try {
    const response = await fetchSubjects();
    dispatch({ type: SUBJECTS_API.FULLFILLED, payload: response.data });
  } catch (error: any) {
    showToast(error);
    dispatch({ type: SUBJECTS_API.REJECTED, error: error.message });
  }
};

export const createSubjectAction = (subject: ICreateSubject) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_SUBJECT_API.STARTED });
  try {
    const response = await createSubject(subject);
    dispatch({ type: CREATE_SUBJECT_API.FULLFILLED, payload: response.data });
    showToast(response);
  } catch (error: any) {
    showToast(error);
    dispatch({ type: CREATE_SUBJECT_API.REJECTED, error: error.message });
  }
};