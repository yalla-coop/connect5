import * as types from '../constants/actionTypes';

const initState = {
  sessionCount: 0,
  responseCount: 0,
  participantCount: 0,
  trainerCount: 0,
  responseRate: 0,
  loaded: false,
};

const stats = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_STATS:
      return { ...payload, loaded: true };

    default:
      return state;
  }
};

export default stats;
