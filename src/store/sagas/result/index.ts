import { call, put, takeEvery } from 'redux-saga/effects';

import showToast from 'utils/toastMessage';
import { IApiResponse, ICreateResult, IResultData } from 'utils/types';
import { getResult, createResult, updateResult, deleteResult } from 'api/result';
import { 
  fetchResultsFulfilled, fetchResultsRejected, 
  createResultFulfilled, createResultRejected, 
  updateResultFulfilled, updateResultRejected, 
  deleteResultFulfilled, deleteResultRejected,
  fetchResultsStarted
} from 'store/reducers/result';
import { RESULTS_API, CREATE_RESULT_API, UPDATE_RESULT_API, DELETE_RESULT_API } from 'store/types';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchResultsSaga() {
  try {
    yield put(fetchResultsStarted());
    const response : IApiResponse = yield call(getResult);
    yield put(fetchResultsFulfilled(response.data));
  } catch (error: any) {
    yield put(fetchResultsRejected(error.message));
    showToast(error);
  }
}

function* createResultSaga(action: PayloadAction<ICreateResult>) {
  try {
    const response : IApiResponse = yield call(createResult, action.payload);
    yield put(createResultFulfilled(response.data));
    showToast(response);
  } catch (error: any) {
    yield put(createResultRejected(error.message));
    showToast(error);
  }
}

function* updateResultSaga(action: PayloadAction<ICreateResult>) {
  try {
    const response : IApiResponse = yield call(updateResult, action.payload);
    yield put(updateResultFulfilled(response.data));
    showToast(response);
  } catch (error: any) {
    yield put(updateResultRejected(error.message));
    showToast(error);
  }
}

function* deleteResultSaga(action: PayloadAction<IResultData>) {
  try {
    const response : IApiResponse = yield call(deleteResult, action.payload);
    yield put(deleteResultFulfilled(action.payload));
    showToast(response);
  } catch (error: any) {
    yield put(deleteResultRejected(error.message));
    showToast(error);
  }
}

function* resultSaga() {
  yield takeEvery(RESULTS_API.STARTED, fetchResultsSaga);
  yield takeEvery(CREATE_RESULT_API.STARTED, createResultSaga);
  yield takeEvery(UPDATE_RESULT_API.STARTED, updateResultSaga);
  yield takeEvery(DELETE_RESULT_API.STARTED, deleteResultSaga);
}

export default resultSaga;
