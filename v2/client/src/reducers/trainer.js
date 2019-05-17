import * as types from '../constants/actionTypes';

const initState = {};

const trainerResults = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_TRINER_RESULTS_SUCCESS:
      return payload;

    default:
      return state;
  }
};

export default trainerResults;
