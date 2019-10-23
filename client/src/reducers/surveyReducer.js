/* eslint-disable no-case-declarations */
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
  preSurveyResponses: null,
};

const createGroupsArray = obj => [...new Set(obj.map(e => e.group.text))];

const fetchedSurveyData = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SURVEY_DATA:
      const groups = createGroupsArray(payload.questionsForSurvey);
      return {
        ...state,
        surveyData: payload,
        uniqueGroups: groups,
        uniqueGroupsAll: groups,
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
      // payload[0] tells if PIN is included in participant table -> demographic data exists
      // payload[1] tells if PIN has filled out a pre-survey if relevant post-session

      const createdGroups = createGroupsArray(
        state.surveyData.questionsForSurvey
      );

      const demographicGroup = state.uniqueGroupsAll.find(
        item => item === 'demographic'
      );

      return {
        ...state,
        skipDemo: true,
        preSurveyResponses: payload[1],
        uniqueGroups:
          demographicGroup && payload[0]
            ? createdGroups.filter(item => item !== 'demographic')
            : createdGroups,
      };
    case GET_PARTICIPANT_BY_PIN_FAIL:
      return {
        ...state,
        skipDemo: false,
        preSurveyResponses: payload[1],
        uniqueGroups: createGroupsArray(state.surveyData.questionsForSurvey),
      };
    default:
      return state;
  }
};

export default fetchedSurveyData;
