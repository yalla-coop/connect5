import { combineReducers } from 'redux';

import behavioralInsightReducer from './behavioralInsight';
import trainerFeedbackReducer from './trainerFeedback';
import userResults from './user';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
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
  groups: groupsReducer,
  behavioralInsight: behavioralInsightReducer,
  trainerFeedback: trainerFeedbackReducer,
});
