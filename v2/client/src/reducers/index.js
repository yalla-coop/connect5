import { combineReducers } from 'redux';

import behavioralInsightReducer from './behavioralInsight';
import userResults from './user';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import trainerReducer from './trainerReducer';
import sessionReducer from './sessionReducer';
import fetchedDataReducer from './fetchedDataReducer';
import statsReducer from './statsReducer';
import fetchedSessions from './fetchSessionReducer';
import groupsReducer from './groups';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  fetchedData: fetchedDataReducer,
  stats: statsReducer,
  results: userResults,
  sessions: fetchedSessions,
  trainers: trainerReducer,
  session: sessionReducer,
  groups: groupsReducer,
  behavioralInsight: behavioralInsightReducer,
});
