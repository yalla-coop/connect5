import axios from 'axios';

import * as types from '../constants/actionTypes';

export const fetchUserResults = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}/results`);
    dispatch({
      type: types.FETCH_USER_RESULTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error('err', err);
  }
};

export const fetchTrainerResults = () => async dispatch => {
  try {
    const res = await axios.get('/api/trainer/info');
    dispatch({
      type: types.FETCH_TRINER_RESULTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error('err', err);
  }
};

export const fetchLocalLeadResults = () => async dispatch => {
  try {
    console.log('res.data');
    const res = await axios.get('/api/localLead/info');
    console.log('res.data', res.data);
    dispatch({
      type: types.FETCH_LEAD_RESULTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error('err', err);
  }
};

export const fetchAdminResults = () => async dispatch => {
  try {
    const res = await axios.get('/api/admin/info');
    dispatch({
      type: types.FETCH_ADMIN_RESULTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error('err', err);
  }
};
