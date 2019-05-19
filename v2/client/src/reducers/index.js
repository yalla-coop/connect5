import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import trainerReducer from './trainer';
import fetchedDataReducer from './fetchedDataReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  results: trainerReducer,
  fetchedData: fetchedDataReducer,
});
