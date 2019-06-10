import { combineReducers } from 'redux';

import behavioralInsightReducer from './behavioralInsight';
import trainerFeedbackReducer from './trainerFeedback';
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
<<<<<<< HEAD
  sessions: fetchedSessions,
  trainers: trainerReducer,
  session: sessionReducer,
=======
  trainers: trainerReducer,
  session: sessionReducer,
  sessions: fetchedSessions,
>>>>>>> dc171db9bee4648255d8a915147f1c1974190648
  groups: groupsReducer,
  behavioralInsight: behavioralInsightReducer,
  trainerFeedback: trainerFeedbackReducer,
});
