import {
  FETCH_SURVEY_DATA,
  SURVEY_PIN_EXIST_FAIL,
  SURVEY_PIN_SUCCESS,
  SURVEY_SUBMISSION_SUCCESS,
  SURVEY_SUBMISSION_FAIL,
} from '../constants/actionTypes';

const initialState = {
  surveyData: null,
  loaded: false,
  msg: {},
  PINExist: null,
  errors: {},
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
    case SURVEY_PIN_EXIST_FAIL:
      return {
        ...state,
        PINExist: true,
      };
    case SURVEY_PIN_SUCCESS:
      return {
        ...state,
        PINExist: false,
      };
    case SURVEY_SUBMISSION_SUCCESS:
      return {
        ...state,
      };
    case SURVEY_SUBMISSION_FAIL:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
};

export default fetchedSurveyData;
