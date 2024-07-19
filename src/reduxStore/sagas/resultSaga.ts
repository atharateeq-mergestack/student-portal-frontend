import { call, put, takeLatest, CallEffect, PutEffect } from 'redux-saga/effects';

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
import { ICreateResult, IResultData, IApiResponse } from 'utils/types';
import { createResult, deleteResult, getResult, updateResult } from 'api/result';
import showToast from 'utils/toastMessage';

function* handleFetchResults(): Generator<CallEffect<IApiResponse> | PutEffect<{ type: string; payload?: IResultData[] | string; error?: string }>, void, IApiResponse> {
  try {
    const response : IApiResponse = yield call(getResult);
    yield put({ type: FETCH_RESULTS_SUCCESS, payload: response.data });
  } catch (error: IApiResponse | any) {
    showToast(error)
    yield put({ type: FETCH_RESULTS_FAILURE, error: error.message });
  }
}

function* handleCreateResult(action: { type: string; payload: ICreateResult }): Generator<CallEffect<IApiResponse> | PutEffect<{ type: string; payload?: IResultData | string; error?: string }>, void, IApiResponse> {
  try {
    const response : IApiResponse = yield call(createResult, action.payload);
    yield put({ type: CREATE_RESULT_SUCCESS, payload: response.data });
    showToast(response)
  } catch (error: IApiResponse | any) {
    showToast(error)
    yield put({ type: CREATE_RESULT_FAILURE, error: error.message });
  }
}

function* handleUpdateResult(action: { type: string; payload: ICreateResult }): Generator<CallEffect<IApiResponse> | PutEffect<{ type: string; payload?: ICreateResult | string; error?: string }>, void, IApiResponse> {
  try {
    const response : IApiResponse = yield call(updateResult, action.payload);
    yield put({ type: UPDATE_RESULT_SUCCESS, payload: response.data });
    showToast(response)
  } catch (error: IApiResponse | any) {
    showToast(error)
    yield put({ type: UPDATE_RESULT_FAILURE, error: error.message });
  }
}

function* handleDeleteResult(action: { type: string; payload: IResultData }): Generator<CallEffect<IApiResponse> | PutEffect<{ type: string; payload?: string; error?: string }>, void, IApiResponse> {
  try {
    const response : IApiResponse = yield call(deleteResult, action.payload);
    yield put({ type: DELETE_RESULT_SUCCESS, payload: action.payload._id });
    showToast(response)
  } catch (error: IApiResponse | any) {
    showToast(error)
    yield put({ type: DELETE_RESULT_FAILURE, error: error.message });
  }
}

export function* resultSaga() {
  yield takeLatest(FETCH_RESULTS_REQUEST, handleFetchResults);
  yield takeLatest(CREATE_RESULT_REQUEST, handleCreateResult);
  yield takeLatest(UPDATE_RESULT_REQUEST, handleUpdateResult);
  yield takeLatest(DELETE_RESULT_REQUEST, handleDeleteResult);
}
