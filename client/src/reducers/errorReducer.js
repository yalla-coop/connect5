import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ADD_SESSION_FAIL,
} from '../constants/actionTypes';

const initialState = {
  msg: {},
  status: null,
  id: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ERRORS:
    case ADD_SESSION_FAIL:
      return {
        msg: payload.msg,
        status: payload.status,
        id: payload.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
