import * as types from '../constants/actionTypes';

const initialState = {
  sessionType: [],
  region: [],
  localLead: [],
  trainer: [],
  age: [],
  gender: [],
  ethnic: [],
  workforce: [],
  surveyType: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_FILTERS:
      return { ...state, [payload.key]: payload.value };

    case types.RESET_FILTERS:
      return initialState;

    default:
      return state;
  }
};
