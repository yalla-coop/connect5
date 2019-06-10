import { FETCH_OVERALL_TRAINER_FEEDBACK } from '../constants/actionTypes';

const initialState = {
  data: {},
  loaded: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_OVERALL_TRAINER_FEEDBACK: {
      const { data } = payload;
      return {
        data,
        loaded: true,
      };
    }
    default:
      return state;
  }
}
