import { GET_PARTICIPANTS_DEMOGRAPHIC_SUCCESS } from '../constants/actionTypes';

const initialState = {
  participants: {},
  sessions: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PARTICIPANTS_DEMOGRAPHIC_SUCCESS:
      return {
        ...state,
        participants: payload,
      };
    default:
      return state;
  }
}
