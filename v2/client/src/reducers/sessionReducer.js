import {
  ADD_SESSION_SUCCESS,
  DELETE_SESSION_SUCCESS,
  EDIT_SESSION_SUCCESS,
  GET_SESSION_DETAILS_BY_SHORT_ID,
  UPDATE_ATTENDEES_SUCCESS,
  UPDATE_ATTENDEES_FAIL,
  LOADING_START,
  LOADING_END,
} from '../constants/actionTypes';

const initState = {
  msg: '',
  trainers: [],
  date: null,
  address: null,
  _id: null,
  addendeesUpdatedSuccess: null,
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
        addendeesUpdatedSuccess: true,
        loading: false,
      };

    case UPDATE_ATTENDEES_FAIL:
      return {
        ...state,
        addendeesUpdatedSuccess: false,
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
