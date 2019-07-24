import {
  FETCH_SURVEY_DATA,
  SURVEY_PIN_EXIST_FAIL,
  SURVEY_PIN_SUCCESS,
  SURVEY_SUBMISSION_SUCCESS,
  SURVEY_SUBMISSION_FAIL,
  GET_PARTICIPANT_BY_PIN_SUCCESS,
  GET_PARTICIPANT_BY_PIN_FAIL,
} from '../constants/actionTypes';

const initialState = {
  surveyData: null,
  uniqueGroups: null,
  loaded: false,
  msg: {},
  PINExist: null,
  errors: {},
  skipDemo: false,
};

const fetchedSurveyData = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SURVEY_DATA:
      return {
        ...state,
        surveyData: payload,
        uniqueGroups: [
          ...new Set(payload.questionsForSurvey.map(e => e.group)),
        ],
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
    case GET_PARTICIPANT_BY_PIN_SUCCESS:
      return {
        ...state,
        skipDemo: true,
        uniqueGroups: [state.uniqueGroups.pop()],
      };
    case GET_PARTICIPANT_BY_PIN_FAIL:
      return {
        ...state,
        skipDemo: false,
        uniqueGroups: [
          ...new Set(state.surveyData.questionsForSurvey.map(e => e.group)),
        ],
      };
    default:
      return state;
  }
};

export default fetchedSurveyData;
