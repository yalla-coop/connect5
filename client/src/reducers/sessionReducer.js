import {
  ADD_SESSION_SUCCESS,
  DELETE_SESSION_SUCCESS,
  EDIT_SESSION_SUCCESS,
  GET_SESSION_DETAILS_BY_SHORT_ID,
  UPDATE_ATTENDEES_SUCCESS,
  UPDATE_ATTENDEES_FAIL,
  EMAIL_SCHEDULE_SUCCESS,
  LOADING_START,
  LOADING_END,
} from '../constants/actionTypes';

const initState = {
  msg: '',
  trainers: [],
  date: null,
  address: {
    postcode: null,
    addressLine1: null,
    addressLine2: null,
  },
  _id: null,
  type: null,
  shortId: null,
  numberOfAttendees: null,
  region: null,
  startTime: null,
  endTime: null,
  participantsEmails: [],
  addAttendeesUpdatedSuccess: null,
  loading: false,
};

export default function(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_SESSION_SUCCESS:
    case EDIT_SESSION_SUCCESS:
      return {
        ...state,
        ...payload,
        msg: 'success',
        loading: false,
      };
    case DELETE_SESSION_SUCCESS:
      return {
        ...state,
        msg: payload,
      };

    case GET_SESSION_DETAILS_BY_SHORT_ID:
      return {
        ...state,
        ...payload,
      };

    case UPDATE_ATTENDEES_SUCCESS:
      return {
        ...state,
        addAttendeesUpdatedSuccess: true,
        loading: false,
      };

    case UPDATE_ATTENDEES_FAIL:
      return {
        ...state,
        addAttendeesUpdatedSuccess: false,
        loading: false,
      };

    case EMAIL_SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case LOADING_START:
      return {
        ...state,
        loading: true,
      };

    case LOADING_END:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
