import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
} from '../constants/actionTypes';

const initialState = {
  msg: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        msg: 'password reset successfully',
        payload,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        msg: 'password reset failed',
      };
    default:
      return state;
  }
}
