import {
  ADD_SESSION_SUCCESS,
  DELETE_SESSION_SUCCESS,
  EDIT_SESSION_SUCCESS,
  GET_SESSION_DETAILS_BY_SHORT_ID,
  UPDATE_ATTENDEES_SUCCESS,
  UPDATE_ATTENDEES_FAIL,
} from '../constants/actionTypes';

const initState = {
  msg: '',
  trainers: [],
  date: null,
  address: null,
  _id: null,
  addendeesUpdatedSuccess: null,
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
      };

    case UPDATE_ATTENDEES_FAIL:
      return {
        ...state,
        addendeesUpdatedSuccess: false,
      };

    default:
      return state;
  }
}
