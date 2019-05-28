import * as types from '../constants/actionTypes';

const initState = {
  loaded: false,
  success: null,
  error: null,
  data: null,
};

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TRAINER_TO_GROUP_SUCCESS:
      return { loaded: true, error: false, success: payload.success };

    case types.ADD_TRAINER_TO_GROUP_FAIL:
      return { loaded: true, error: payload, success: false };

    case types.RESET_GROUPS_STATE:
      return initState;

    default:
      return state;
  }
};
