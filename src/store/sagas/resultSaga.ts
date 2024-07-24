import { call, put, takeEvery } from 'redux-saga/effects';

import showToast from 'utils/toastMessage';
import { IApiResponse } from 'utils/types';
import { getResult, createResult, updateResult, deleteResult } from 'api/result';
import { 
  fetchResultsFulfilled, fetchResultsRejected, 
  createResultFulfilled, createResultRejected, 
  updateResultFulfilled, updateResultRejected, 
  deleteResultFulfilled, deleteResultRejected, 
  fetchResultsStarted, createResultStarted,
  updateResultStarted, deleteResultStarted
} from 'store/reducers/resultReducer';
import { RESULTS_API, CREATE_RESULT_API, UPDATE_RESULT_API, DELETE_RESULT_API } from 'store/types';

function* fetchResultsSaga() {
  try {
    yield put(fetchResultsStarted());
    const response : IApiResponse = yield call(getResult);
    yield put(fetchResultsFulfilled(response.data));
  } catch (error: any) {
    showToast(error);
    yield put(fetchResultsRejected(error.message));
  }
}

function* createResultSaga(action: any) {
  try {
    yield put(createResultStarted());
    const response : IApiResponse = yield call(createResult, action.payload);
    yield put(createResultFulfilled(response.data));
    showToast(response);
  } catch (error: any) {
    showToast(error);
    yield put(createResultRejected(error.message));
  }
}

function* updateResultSaga(action: any) {
  try {
    yield put(updateResultStarted());
    const response : IApiResponse = yield call(updateResult, action.payload);
    yield put(updateResultFulfilled(response.data));
    showToast(response);
  } catch (error: any) {
    showToast(error);
    yield put(updateResultRejected(error.message));
  }
}

function* deleteResultSaga(action: any) {
  try {
    yield put(deleteResultStarted());
    const response : IApiResponse = yield call(deleteResult, action.payload);
    yield put(deleteResultFulfilled(action.payload));
    showToast(response);
  } catch (error: any) {
    showToast(error);
    yield put(deleteResultRejected(error.message));
  }
}

function* resultSaga() {
  yield takeEvery(RESULTS_API.STARTED, fetchResultsSaga);
  yield takeEvery(CREATE_RESULT_API.STARTED, createResultSaga);
  yield takeEvery(UPDATE_RESULT_API.STARTED, updateResultSaga);
  yield takeEvery(DELETE_RESULT_API.STARTED, deleteResultSaga);
}

export default resultSaga;
