import { combineReducers } from 'redux';

import userResults from './user';

export default combineReducers({
  results: userResults,
});
