import { FETCH_ALL_TRAINERS } from '../constants/actionTypes';

const initState = { trainers: [] };

export default function(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_TRAINERS:
      return {
        ...state,
        trainers: payload,
      };
    default:
      return state;
  }
}
