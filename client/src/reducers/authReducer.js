import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CHECK_UNIQUE_EMAIL_UNIQUE,
  CHECK_UNIQUE_EMAIL_UNUNIQUE,
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  RESET_UNIQUE_EMAIL,
  CHECK_UNIQUE_EMAIL_ERROR,
  CHECK_USER_BY_EMAIL_SUCCESS,
  CHECK_USER_BY_EMAIL_FAIL,
  LOGOUT,
} from '../constants/actionTypes';

const initialState = {
  isAuthenticated: null,
  isEmailUnique: null,
  loaded: false,
  name: '',
  email: '',
  role: null,
  _id: null,
  checkedUserInfo: {},
  error: null,
  userLevel: null,
  viewLevel: null,
  PIN: null,
  localLead: null,
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
        userLevel: payload.role,
      };

    case LOGIN_FAIL:
    case LOGOUT:
      return {};

    case CHECK_UNIQUE_EMAIL_UNIQUE:
      return {
        ...state,
        isEmailUnique: true,
        checkedUserInfo: {},
        loaded: true,
      };

    case CHECK_UNIQUE_EMAIL_UNUNIQUE:
      return {
        ...state,
        isEmailUnique: false,
        checkedUserInfo: payload,
        loaded: true,
      };

    case CHECK_UNIQUE_EMAIL_ERROR:
      return {
        ...state,
        isEmailUnique: false,
        checkedUserInfo: {},
        loaded: true,
        error: payload,
      };

    case USER_AUTHENTICATED:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loaded: true,
        userLevel: payload.role,
      };

    case USER_UNAUTHENTICATED:
      return {
        ...initialState,
        isAuthenticated: false,
        loaded: true,
      };

    case RESET_UNIQUE_EMAIL:
      return {
        ...state,
        checkedUserInfo: {},
        isEmailUnique: null,
      };

    case CHECK_USER_BY_EMAIL_SUCCESS:
      return {
        ...state,
        ...payload,
      };

    case CHECK_USER_BY_EMAIL_FAIL:
      return {
        ...initialState,
        msg: 'you are not a user',
      };

    default:
      return state;
  }
}
