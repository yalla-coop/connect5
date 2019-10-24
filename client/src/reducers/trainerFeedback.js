import {
  FETCH_FEEDBACK,
  FETCH_TRAIN_TRAINERS_FEEDBACK,
} from '../constants/actionTypes';

const initialState = {
  feedback: {},
  trainTrainersFeedback: {},
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

    case FETCH_TRAIN_TRAINERS_FEEDBACK: {
      const { data } = payload;
      return {
        ...state,
        trainTrainersFeedback: data,
        loaded: true,
      };
    }

    default:
      return state;
  }
}
