import axios from 'axios';

import history from '../history';

import * as types from '../constants/actionTypes';

export const fetchUserResults = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}/results`);
    dispatch({
      type: types.FETCH_USER_RESULTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
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
