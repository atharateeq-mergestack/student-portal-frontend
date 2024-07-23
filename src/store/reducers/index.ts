import { combineReducers } from 'redux';

import subjectReducer from 'store/reducers/subjectReducer';
import resultReducer from 'store/reducers/resultReducer';

const rootReducer = combineReducers({
  subjects: subjectReducer,
  results: resultReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
 