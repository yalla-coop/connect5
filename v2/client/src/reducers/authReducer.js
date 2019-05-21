import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CHECK_UNIQUE_EMAIL,
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
} from '../constants/actionTypes';

const initialState = {
  isAuthenticated: null,
  isEmailUnique: null,
  loaded: false,
  role: null,
  _id: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loaded: true,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loaded: true,
      };

    case CHECK_UNIQUE_EMAIL:
      return {
        ...state,
        isEmailUnique: payload,
        loaded: true,
      };

    case USER_AUTHENTICATED:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loaded: true,
      };

    case USER_UNAUTHENTICATED:
      return {
        ...initialState,
        isAuthenticated: false,
        loaded: true,
      };

    default:
      return state;
  }
}
