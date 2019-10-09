import { FETCH_BEHAVIORAL } from '../constants/actionTypes';

const initialState = {
  data: [],
  role: null,
  loaded: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_BEHAVIORAL: {
      const { data, role } = payload;
      return {
        ...state,
        data,
        role,
        loaded: true,
      };
    }

    default:
      return state;
  }
}
