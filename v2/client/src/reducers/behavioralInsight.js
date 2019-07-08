import {
  FETCH_PARTICIPANT_BEHAVIORAL,
  FETCH_SURVEY_BEHAVIORAL,
  FETCH_TRAINER_BEHAVIORAL,
} from '../constants/actionTypes';

const initialState = {
  trainer: {
    role: '',
    data: {},
    loaded: false,
  },
  survey: {
    role: '',
    data: {},
    loaded: false,
  },
  participant: {
    role: '',
    data: {},
    loaded: false,
  },
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PARTICIPANT_BEHAVIORAL: {
      const { data, role } = payload;
      return {
        ...state,
        participant: {
          data,
          role,
          loaded: true,
        },
      };
    }

    case FETCH_SURVEY_BEHAVIORAL: {
      const { data, role } = payload;
      return {
        ...state,
        survey: {
          data,
          role,
          loaded: true,
        },
      };
    }

    case FETCH_TRAINER_BEHAVIORAL: {
      const { data, role } = payload;
      return {
        ...state,
        trainer: {
          data,
          role,
          loaded: true,
        },
      };
    }

    default:
      return state;
  }
}
