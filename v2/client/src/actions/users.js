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

export const fetchbehavioralInsight = (role, idOrPIN) => async dispatch => {
  try {
    const url = `/api/behavioral-insight/${role}/${idOrPIN}`;
    const res = await axios.get(url);

    dispatch({
      type: types.FETCH_BEHAVIORAL_INSIGHT,
      payload: { data: res.data, role },
    });
  } catch (error) {
    // must check the error status code before
    history.push('/404err');
  }
};

export const fetchTrainerFeedback = (
  trainerId,
  sessionId
) => async dispatch => {
  try {
    const url = `/api/feedback/trainer/${trainerId}`;
    const data = { sessionId };

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
