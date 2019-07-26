import axios from 'axios';
import swal from 'sweetalert2';
import history from '../history';

import {
  FETCH_SURVEY_DATA,
  SURVEY_PIN_EXIST_FAIL,
  SURVEY_PIN_SUCCESS,
  SURVEY_SUBMISSION_SUCCESS,
  SURVEY_SUBMISSION_FAIL,
  GET_PARTICIPANT_BY_PIN_SUCCESS,
  GET_PARTICIPANT_BY_PIN_FAIL,
} from '../constants/actionTypes';

import { returnErrors } from './errorAction';
// import history from '../history';

export const fetchSurveyData = surveyParts => dispatch => {
  axios
    .get(`/api/survey/${surveyParts}`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_SURVEY_DATA,
        payload: data,
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'fetching survey data failed'
        )
      );
    });
};

export const checkPINResponses = (surveyParts, PIN) => dispatch => {
  axios
    .get(`/api/survey/${surveyParts}/${PIN}`)
    .then(({ data }) => {
      const { exist } = data;

      if (exist) {
        dispatch({
          type: SURVEY_PIN_EXIST_FAIL,
          msg: "The PIN you've entered has already submitted this survey",
        });
      } else {
        dispatch({
          type: SURVEY_PIN_SUCCESS,
          payload: data,
        });
      }
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'checking PIN data failed'
        )
      );
    });
};

export const submitSurvey = formSubmission => dispatch => {
  axios
    .post(`/api/survey/submit/`, formSubmission)
    .then(({ data }) => {
      dispatch({
        type: SURVEY_SUBMISSION_SUCCESS,
        payload: data,
      });
      return swal
        .fire('Done!', 'Thanks for submitting your feedback!', 'success')
        .then(() => history.push('/thank-you'))
        .catch(err => {
          dispatch(
            returnErrors(
              err.response.data,
              err.response.status,
              'error submitting survey'
            )
          );
        });
    })
    .catch(err => {
      dispatch({ type: SURVEY_SUBMISSION_FAIL, payload: err.response.data });
      return swal.fire({
        title:
          'There was an error submitting your survey. Please check that you have answered all required questions and entered your correct PIN',
        type: 'error',
      });
    });
};

export const getParticipantByPIN = (PIN, sessionId) => dispatch => {
  axios
    .post(`/api/participant/${PIN}`, { sessionId })
    .then(({ data }) => {
      dispatch({ type: GET_PARTICIPANT_BY_PIN_SUCCESS, payload: data });
    })
    .catch(err => {
      dispatch({
        type: GET_PARTICIPANT_BY_PIN_FAIL,
        payload: err.response.data,
      });
    });
};
