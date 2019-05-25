import {
  FETCH_TRAINERS_SESSIONS,
  FETCH_LOCAL_LEAD_SESSIONS,
  FETCH_ALL_SESSIONS,
  FETCH_SESSION_DETAILS,
} from '../constants/actionTypes';

const initState = {
  sessions: [],
  sessionsCount: '',
  sessionDetails: {},
};

const fetchedSessions = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TRAINERS_SESSIONS:
    case FETCH_LOCAL_LEAD_SESSIONS:
      return { ...state, sessions: payload };
    case FETCH_ALL_SESSIONS:
      return { ...state, sessionsCount: payload };
    case FETCH_SESSION_DETAILS:
      return { ...state, sessionDetails: payload };
    default:
      return state;
  }
};

export default fetchedSessions;
