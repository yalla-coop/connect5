import { FETCH_BEHAVIORAL_INSIGHT } from '../constants/actionTypes';

const initialState = {
  role: '',
  data: {},
  loaded: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_BEHAVIORAL_INSIGHT: {
      const { data, role } = payload;
      return {
        data,
        role,
        loaded: true,
      };
    }

    default:
      return state;
  }
}
