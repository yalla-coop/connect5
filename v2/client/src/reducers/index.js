import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import trainerReducer from './trainer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  results: trainerReducer,
});
