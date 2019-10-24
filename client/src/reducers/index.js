import { combineReducers } from 'redux';

import { LOGOUT } from '../constants/actionTypes';

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
import viewReducer from './viewReducer';
import changePasswordReducer from './changePasswordReducer';
import exportDataReducer from './exportDataReducer';
import demographicsReducer from './demographics';
import adminSessionsReducer from './adminSessionsReducer';
import surveyReducer from './surveyReducer';
import confirmRegistration from './confirmRegistration';
import storeSessionData from './storeSessionData';
import checkBrowserWidth from './checkBrowserWidthReducer';
import loadingReducer from './loading';
import filters from './filters';

const appReducer = combineReducers({
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
  trainerFeedback: trainerFeedbackReducer,
  viewLevel: viewReducer,
  changePassword: changePasswordReducer,
  exportData: exportDataReducer,
  demographics: demographicsReducer,
  adminSessions: adminSessionsReducer,
  survey: surveyReducer,
  confirmRegistration,
  storeSessionData,
  checkBrowserWidth,
  loading: loadingReducer,
  filters,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
