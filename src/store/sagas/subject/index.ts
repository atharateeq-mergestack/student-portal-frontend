import { call, put, takeEvery } from 'redux-saga/effects';
import showToast from 'utils/toastMessage';
import { fetchSubjects, createSubject } from 'api/subject';
import { SUBJECTS_API, CREATE_SUBJECT_API } from 'store/types';
import { 
  fetchSubjectsFulfilled, fetchSubjectsRejected, 
  createSubjectFulfilled, createSubjectRejected,
} from 'store/reducers/subject';
import { IApiResponse } from 'utils/types';

function* fetchSubjectsSaga() {
  try{
    const response : IApiResponse = yield call(fetchSubjects);
    yield put(fetchSubjectsFulfilled(response.data));
  } catch (error: any) {
    yield put(fetchSubjectsRejected(error.message));
    showToast(error);
  }
}

function* createSubjectSaga(action: any) {
  try {
    const response : IApiResponse = yield call(createSubject, action.payload);
    yield put(createSubjectFulfilled(response.data));
    showToast(response);
  } catch (error: any) {
    yield put(createSubjectRejected(error.message));
    showToast(error);
  }
}

function* subjectSaga() {
  yield takeEvery(SUBJECTS_API.STARTED, fetchSubjectsSaga);
  yield takeEvery(CREATE_SUBJECT_API.STARTED, createSubjectSaga);
}

export default subjectSaga;
