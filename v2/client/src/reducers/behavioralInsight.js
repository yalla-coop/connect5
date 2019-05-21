import { FETCH_BEHAVIORAL_INSIGHT } from '../constants/actionTypes';

const initialState = {
  role: '',
  data: {},
  loaded: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_BEHAVIORAL_INSIGHT:
      return {
        ...payload,
        loaded: true,
      };

    default:
      return state;
  }
}
