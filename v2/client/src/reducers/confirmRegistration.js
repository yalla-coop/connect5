import {
  CONFIRM_REGISTRATION_ERROR,
  CONFIRM_REGISTRATION_SUCCESS,
} from '../constants/actionTypes';

const initState = {
  success: null,
  error: null,
  message: null,
};

const userResults = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CONFIRM_REGISTRATION_SUCCESS:
      return {
        success: true,
      };

    case CONFIRM_REGISTRATION_ERROR:
      return {
        error: true,
        message: payload,
      };

    default:
      return state;
  }
};

export default userResults;
