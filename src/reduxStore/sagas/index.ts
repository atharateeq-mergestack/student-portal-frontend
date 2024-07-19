import { all, fork } from 'redux-saga/effects';

import { subjectSaga } from 'reduxStore//sagas/subjectSaga';
import { resultSaga } from 'reduxStore//sagas/resultSaga';

export default function* rootSaga() {
  yield all([
    fork(subjectSaga),
    fork(resultSaga),
  ]);
}
