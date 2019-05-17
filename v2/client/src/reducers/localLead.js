import * as types from '../constants/actionTypes';

const initState = {};

const localLeadResults = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_LEAD_RESULTS_SUCCESS:
    case types.FETCH_ADMIN_RESULTS_SUCCESS:
      return payload;

    default:
      return state;
  }
};

export default localLeadResults;
