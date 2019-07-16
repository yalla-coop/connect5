import axios from 'axios';

import history from '../history';

import * as types from '../constants/actionTypes';
import { returnErrors } from './errorAction';

export const fetchUserResults = (id, role) => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${id}/results`, { id, role });
    dispatch({
      type: types.FETCH_USER_RESULTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    history.push('/404err');
  }
};

export const fetchTrainerFeedback = (
  trainerId,
  sessionId,
  surveyType
) => async dispatch => {
  try {
    const url = `/api/feedback/`;
    const data = { trainerId, sessionId, surveyType };

    const res = await axios.post(url, data);

    dispatch({
      type: types.FETCH_OVERALL_TRAINER_FEEDBACK,
      payload: { data: res.data },
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data,
        err.response.status,
        'FETCH_TRAINER_FEEDBACK_FAIL'
      )
    );

    history.push('/404err');
  }
};

export const fetchLocalLeads = () => async dispatch => {
  try {
    const res = await axios.get('/api/local-leads');
    const { data } = res;

    dispatch({
      type: types.FETCH_LOCAL_LEADS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocalLeadTrainersGroup = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/local-lead/${id}/group`);
    dispatch({
      type: types.FETCH_LOCAL_LEAD_TRAINERS_GROUP,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchStatsData = userType => async dispatch => {
  try {
    const res = await axios.post('/api/all/dashboard', { userType });
    const { data } = res;

    dispatch({
      type: types.FETCH_STATS,
      payload: data.stats,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addTrainerToGroup = trianerInfo => async dispatch => {
  try {
    const res = await axios.post('/api/users/local-leads/group', trianerInfo);

    dispatch({
      type: types.ADD_TRAINER_TO_GROUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.ADD_TRAINER_TO_GROUP_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const checkUserByEmail = email => async dispatch => {
  try {
    const res = await axios.get(`/api/users/forget-password/?email=${email}`);

    dispatch({
      type: types.CHECK_USER_BY_EMAIL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.CHECK_USER_BY_EMAIL_FAIL,
      payload: error.response.data.error,
    });
  }
};
