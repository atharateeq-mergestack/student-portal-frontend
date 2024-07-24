import { all } from 'redux-saga/effects';

import subjectSaga from 'store/sagas/subjectSaga';
import resultSaga from 'store/sagas/resultSaga';

export default function* rootSaga() {
  yield all([
    subjectSaga(),
    resultSaga(),
  ]);
}
