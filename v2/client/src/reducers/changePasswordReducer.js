import {
  CHANGE_PASSWORD_SUCCESS,
  // CHANGE_PASSWORD_FAIL,
} from '../constants/actionTypes';

const initialState = {
  msg: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_PASSWORD_SUCCESS:
      return {
        msg: 'success',
        payload,
      };
    // case CHANGE_PASSWORD_FAIL:
    //   return {
    //     msg: 'fail',
    //   };
    default:
      return state;
  }
}
