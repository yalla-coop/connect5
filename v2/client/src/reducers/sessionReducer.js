import {
  ADD_SESSION_SUCCESS,
  DELETE_SESSION_SUCCESS,
} from '../constants/actionTypes';

const initState = {
  msg: '',
};

export default function(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_SESSION_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case DELETE_SESSION_SUCCESS:
      return {
        ...state,
        msg: payload,
      };
    default:
      return state;
  }
}
