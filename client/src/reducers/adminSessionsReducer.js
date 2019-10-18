import { FETCH_SESSIONS_PER_REGIONS } from '../constants/actionTypes';

const initState = {
  sessions: [],
};

const fetchedSessions = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SESSIONS_PER_REGIONS:
      return { ...state, sessions: payload, loaded: true };
    default:
      return state;
  }
};

export default fetchedSessions;
