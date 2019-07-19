import axios from 'axios';
import { Modal } from 'antd';

import {
  FETCH_SURVEY_DATA,
  SURVEY_DATA_FAIL,
  SURVEY_PIN_EXIST_FAIL,
  SURVEY_PIN_SUCCESS,
  SURVEY_DATA_FAIL_PIN,
} from '../constants/actionTypes';

import { returnErrors } from './errorAction';
// import history from '../history';

export const fetchSurveyData = surveyParts => async dispatch => {
  axios
    .get(`/api/survey/${surveyParts}`)
    .then(res => {
      dispatch({
        type: FETCH_SURVEY_DATA,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'SURVEY_DATA_FAIL')
      );
      dispatch({
        type: SURVEY_DATA_FAIL,
      });
    });
};

export const checkPINResponses = (surveyParts, PIN) => async dispatch => {
  axios
    .get(`/api/survey/${surveyParts}/${PIN}`)
    .then(({ data }) => {
      const { exist } = data;

      if (exist) {
        dispatch({
          type: SURVEY_PIN_EXIST_FAIL,
          msg: "The PIN you've entered has already submitted this survey",
        });
        // Modal.error({
        //   title: 'Error!',
        //   content: "The PIN you've entered has already submitted this survey.",
        //   onOk: history.push('/'),
        // });
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
          'SURVEY_DATA_FAIL_PIN'
        )
      );
      dispatch({
        type: SURVEY_DATA_FAIL_PIN,
      });
    });
};
