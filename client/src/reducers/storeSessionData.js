import {
  STORE_SESSION_DATA,
  CLEAR_SESSION_DATA,
} from '../constants/actionTypes';

const initialState = {};

const storeSessionData = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case STORE_SESSION_DATA:
      return {
        ...state,
        ...payload,
      };
    case CLEAR_SESSION_DATA:
      return initialState;

    default:
      return state;
  }
};

export default storeSessionData;
