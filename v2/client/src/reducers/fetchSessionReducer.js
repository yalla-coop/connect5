import {
  FETCH_TRAINERS_SESSIONS,
  FETCH_LOCAL_LEAD_SESSIONS,
  FETCH_ALL_SESSIONS,
  FETCH_SESSION_DETAILS,
  FETCH_SESSIONS_PER_REGIONS,
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
    case FETCH_SESSIONS_PER_REGIONS:
    case FETCH_TRAINERS_SESSIONS:
    case FETCH_LOCAL_LEAD_SESSIONS:
      return { ...state, sessions: payload, loaded: true };
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
