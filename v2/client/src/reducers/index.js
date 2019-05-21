import { combineReducers } from 'redux';

import behavioralInsightReducer from './behavioralInsight';
import userResults from './user';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  results: userResults,
  behavioralInsight: behavioralInsightReducer,
});
