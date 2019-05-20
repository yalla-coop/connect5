import { combineReducers } from 'redux';

import userResults from './user';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import fetchedDataReducer from './fetchedDataReducer';
import statsReducer from './statsReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  fetchedData: fetchedDataReducer,
  stats: statsReducer,
  results: userResults,
});
