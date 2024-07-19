import { combineReducers } from 'redux';

import { subjectReducer } from 'reduxStore/reducers/subjectReducer';
import { resultReducer } from 'reduxStore/reducers/resultReducer';

const rootReducer = combineReducers({
  subjects: subjectReducer,
  results: resultReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
 