import { ADD_SESSION_SUCCESS } from '../constants/actionTypes';

const initState = {};

export default function(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_SESSION_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
