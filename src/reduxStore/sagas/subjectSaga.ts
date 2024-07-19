import { call, put, takeLatest, CallEffect, PutEffect } from 'redux-saga/effects';

import {
  FETCH_SUBJECTS_REQUEST,
  FETCH_SUBJECTS_SUCCESS,
  FETCH_SUBJECTS_FAILURE,
  CREATE_SUBJECT_REQUEST,
  CREATE_SUBJECT_SUCCESS,
  CREATE_SUBJECT_FAILURE,
} from 'reduxStore/actions/actionTypes';
import { ICreateSubject, IApiResponse, ISubject } from 'utils/types';
import { createSubject, fetchSubjects } from 'api/subject';
import showToast from 'utils/toastMessage';

function* handleFetchSubjects(): Generator<CallEffect<IApiResponse> | PutEffect<{ type: string; payload?: ISubject[] | string; error?: string }>, void, IApiResponse> {
  try {
    const response : IApiResponse = yield call(fetchSubjects);
    yield put({ type: FETCH_SUBJECTS_SUCCESS, payload: response.data });
  } catch (error: IApiResponse | any) {
    yield put({ type: FETCH_SUBJECTS_FAILURE, error: error.message });
  }
}

function* handleCreateSubject(action: { type: string; payload: ICreateSubject }): Generator<CallEffect<IApiResponse> | PutEffect<{ type: string; payload?: ISubject | string; error?: string }>, void, IApiResponse> {
  try {
    const response : IApiResponse = yield call(createSubject, action.payload);
    yield put({ type: CREATE_SUBJECT_SUCCESS, payload: response.data });
    showToast(response)
  } catch (error: IApiResponse | any) {
    showToast(error)
    yield put({ type: CREATE_SUBJECT_FAILURE, error: error.message });
  }
}

export function* subjectSaga() {
  yield takeLatest(FETCH_SUBJECTS_REQUEST, handleFetchSubjects);
  yield takeLatest(CREATE_SUBJECT_REQUEST, handleCreateSubject);
}
