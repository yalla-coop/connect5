import {
  FETCH_OVERALL_TRAINER_FEEDBACK,
  PARTICIPANT_FEEDBACK_SUCCESS,
} from '../constants/actionTypes';

const initialState = {
  participant: {
    data: {},
    loaded: false,
  },
  trainer: {
    data: {},
    loaded: false,
  },
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_OVERALL_TRAINER_FEEDBACK: {
      const { data } = payload;
      return {
        ...state,
        trainer: {
          data,
          loaded: true,
        },
      };
    }
    case PARTICIPANT_FEEDBACK_SUCCESS: {
      return {
        ...state,
        participant: {
          data: payload,
          loaded: true,
        },
      };
    }
    default:
      return state;
  }
}
