import {
  FETCH_TRAINERS_SESSIONS,
  FETCH_LOCAL_LEAD_SESSIONS,
  FETCH_ALL_SESSIONS,
} from '../constants/actionTypes';

const initState = {
  sessions: [],
  sessionsCount: '',
};

const fetchedSessions = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TRAINERS_SESSIONS:
    case FETCH_LOCAL_LEAD_SESSIONS:
      return { ...state, sessions: payload };
    case FETCH_ALL_SESSIONS:
      return { ...state, sessionsCount: payload };
    default:
      return state;
  }
};

export default fetchedSessions;
