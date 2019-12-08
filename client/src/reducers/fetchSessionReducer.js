import {
  FETCH_TRAINERS_SESSIONS,
  FETCH_LOCAL_LEAD_SESSIONS,
  FETCH_ALL_SESSIONS,
  FETCH_SESSION_DETAILS,
  FETCH_PARTICIPANT_SESSIONS_SUCCESS,
  FETCH_PARTICIPANT_SESSIONS_BY_EMAIL_SUCCESS,
} from '../constants/actionTypes';

const initState = {
  sessions: [],
  participantSessions: [],
  participantSessionsByEmail: [],
  sessionsCount: '',
  sessionDetails: {},
  loaded: false,
};

const fetchedSessions = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TRAINERS_SESSIONS:
    case FETCH_LOCAL_LEAD_SESSIONS:
      return { ...state, sessions: payload, loaded: true };
    case FETCH_ALL_SESSIONS:
      return { ...state, sessions: payload, loaded: true };
    case FETCH_PARTICIPANT_SESSIONS_SUCCESS:
      return { ...state, participantSessions: payload };
    case FETCH_PARTICIPANT_SESSIONS_BY_EMAIL_SUCCESS:
      return { ...state, participantSessionsByEmail: payload };
    case FETCH_SESSION_DETAILS:
      return { ...state, sessionDetails: payload, loaded: true };
    default:
      return state;
  }
};

export default fetchedSessions;
