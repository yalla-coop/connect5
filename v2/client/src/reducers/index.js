import { combineReducers } from 'redux';
import authReducer from './authReducer';
import trainerReducer from './trainer';

export default combineReducers({
  auth: authReducer,
  results: trainerReducer,
});
