import * as types from '../constants/actionTypes';

const initState = {};

const userResults = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_USER_RESULTS_SUCCESS:
      return payload;

    default:
      return state;
  }
};

export default userResults;
