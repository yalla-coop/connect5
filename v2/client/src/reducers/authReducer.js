import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CHECK_UNIQUE_EMAIL,
} from '../constants/actionTypes';

const initialState = {
  isAuthenticated: null,
  isEmailUnique: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    case CHECK_UNIQUE_EMAIL:
      return {
        ...state,
        isEmailUnique: payload,
      };
    default:
      return state;
  }
}
