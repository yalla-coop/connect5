import { combineReducers } from 'redux';

import trainerReducer from './trainer';

export default combineReducers({ results: trainerReducer });
