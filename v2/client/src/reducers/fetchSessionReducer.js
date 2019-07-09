import {
  FETCH_TRAINERS_SESSIONS,
  FETCH_LOCAL_LEAD_SESSIONS,
  FETCH_ALL_SESSIONS,
  FETCH_SESSION_DETAILS,
  FETCH_PRTICIPENT_SESSIONS_SUCCESS,
} from '../constants/actionTypes';

const initState = {
  sessions: [],
  sessionsCount: '',
  sessionDetails: {},
  loaded: false,
};

const fetchedSessions = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TRAINERS_SESSIONS:
    case FETCH_LOCAL_LEAD_SESSIONS:
    case FETCH_PRTICIPENT_SESSIONS_SUCCESS:
      return { ...state, sessions: payload };
    case FETCH_ALL_SESSIONS:
      return { ...state, sessionsCount: payload };
    case FETCH_SESSION_DETAILS:
      return { ...state, sessionDetails: payload, loaded: true };
    default:
      return state;
  }
};

export default fetchedSessions;
