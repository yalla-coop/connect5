import { combineReducers } from 'redux';

import userResults from './user';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import trainerReducer from './trainerReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  results: userResults,
  trainers: trainerReducer,
  session: sessionReducer,
});
