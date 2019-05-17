import { combineReducers } from 'redux';

import trainerReducer from './trainer';
import localLeadResults from './localLead';
import userResults from './user';

export default combineReducers({
  trainer: trainerReducer,
  loaclLead: localLeadResults,
  results: userResults,
});
