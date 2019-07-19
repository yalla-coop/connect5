import axios from 'axios';
import swal from 'sweetalert2';

import { FETCH_SURVEY_DATA, SURVEY_DATA_FAIL } from '../constants/actionTypes';

import { returnErrors } from './errorAction';

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
