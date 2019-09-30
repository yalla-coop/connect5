import { FETCH_FEEDBACK } from '../constants/actionTypes';

const initialState = {
  feedback: {},
  loaded: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_FEEDBACK: {
      const { data } = payload;
      return {
        ...state,
        feedback: data,
        loaded: true,
      };
    }

    default:
      return state;
  }
}
