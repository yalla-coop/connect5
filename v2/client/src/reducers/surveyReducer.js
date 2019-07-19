import {
  FETCH_SURVEY_DATA,
  SURVEY_DATA_FAIL,
  SURVEY_PIN_EXIST_FAIL,
  SURVEY_PIN_SUCCESS,
  SURVEY_DATA_FAIL_PIN,
} from '../constants/actionTypes';

const initialState = {
  surveyData: null,
  loaded: false,
  msg: {},
  PINExist: null,
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
    case SURVEY_DATA_FAIL_PIN:
      return {
        ...state,
        msg: 'checking PIN process failed',
      };
    default:
      return state;
  }
};

export default fetchedSurveyData;
