import axios from 'axios';

import * as types from '../constants/actionTypes';

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
