import { call, put, takeEvery } from 'redux-saga/effects';
import showToast from 'utils/toastMessage';
import { fetchSubjects, createSubject } from 'api/subject';
import { SUBJECTS_API, CREATE_SUBJECT_API } from 'store/types';
import { 
  fetchSubjectsFulfilled, fetchSubjectsRejected, 
  createSubjectFulfilled, createSubjectRejected, 
  fetchSubjectsStarted, createSubjectStarted
} from 'store/reducers/subjectReducer';
import { IApiResponse } from 'utils/types';

function* fetchSubjectsSaga() {
  try{
    yield put(fetchSubjectsStarted());
    const response : IApiResponse = yield call(fetchSubjects);
    yield put(fetchSubjectsFulfilled(response.data));
  } catch (error: any) {
    showToast(error);
    yield put(fetchSubjectsRejected(error.message));
  }
}

function* createSubjectSaga(action: any) {
  try {
    yield put(createSubjectStarted());
    const response : IApiResponse = yield call(createSubject, action.payload);
    yield put(createSubjectFulfilled(response.data));
    showToast(response);
  } catch (error: any) {
    showToast(error);
    yield put(createSubjectRejected(error.message));
  }
}

function* subjectSaga() {
  yield takeEvery(SUBJECTS_API.STARTED, fetchSubjectsSaga);
  yield takeEvery(CREATE_SUBJECT_API.STARTED, createSubjectSaga);
}

export default subjectSaga;
