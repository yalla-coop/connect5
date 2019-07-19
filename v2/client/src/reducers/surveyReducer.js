import { FETCH_SURVEY_DATA, SURVEY_DATA_FAIL } from '../constants/actionTypes';

const initialState = {
  surveyData: null,
  loaded: false,
  msg: {},
};

const fetchedSurveyData = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SURVEY_DATA:
      return {
        ...state,
        surveyData: payload,
        loaded: true,
      };
    case SURVEY_DATA_FAIL:
      return {
        msg: 'fetching survey data failed',
        loaded: true,
      };
    default:
      return state;
  }
};

export default fetchedSurveyData;
