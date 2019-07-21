import {
  ADD_SESSION_SUCCESS,
  DELETE_SESSION_SUCCESS,
  EDIT_SESSION_SUCCESS,
  GET_SESSION_DETAILS_BY_SHORT_ID,
} from '../constants/actionTypes';

const initState = {
  msg: '',
  trainers: [],
  date: null,
  location: null,
  _id: null,
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

    default:
      return state;
  }
}
