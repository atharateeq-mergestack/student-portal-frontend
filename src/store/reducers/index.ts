import { combineReducers } from 'redux';

import subjectReducer from 'store/reducers/subject';
import resultReducer from 'store/reducers/result';

const rootReducer = combineReducers({
  subjects: subjectReducer,
  results: resultReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
