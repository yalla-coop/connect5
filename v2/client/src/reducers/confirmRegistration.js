import {
  CONFIRM_REGISTRATION_ERROR,
  CONFIRM_REGISTRATION_SUCCESS,
} from '../constants/actionTypes';

const initState = {
  confimSuccess: null,
  error: null,
  message: null,
};

const confirmRegistration = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CONFIRM_REGISTRATION_SUCCESS:
      return {
        confimSuccess: true,
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

export default confirmRegistration;
