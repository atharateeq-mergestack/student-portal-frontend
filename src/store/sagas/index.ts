import { all } from 'redux-saga/effects';

import subjectSaga from 'store/sagas/subject';
import resultSaga from 'store/sagas/result';

export default function* rootSaga() {
  yield all([
    subjectSaga(),
    resultSaga(),
  ]);
}
