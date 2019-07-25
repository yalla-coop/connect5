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

const createGroupsArray = obj => [...new Set(obj.map(e => e.group))];

const fetchedSurveyData = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SURVEY_DATA:
      return {
        ...state,
        surveyData: payload,
        uniqueGroups: createGroupsArray(payload.questionsForSurvey),
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
        uniqueGroups:
          state.uniqueGroups[0] === 'demographic'
            ? [createGroupsArray(state.surveyData.questionsForSurvey).pop()]
            : createGroupsArray(state.surveyData.questionsForSurvey),
      };
    case GET_PARTICIPANT_BY_PIN_FAIL:
      return {
        ...state,
        skipDemo: false,
        uniqueGroups: createGroupsArray(state.surveyData.questionsForSurvey),
      };
    default:
      return state;
  }
};

export default fetchedSurveyData;
