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
    // console.error('errrrrrr', err.response.data.error);
    history.push('/404err');
  }
};

export const fetchbehavioralInsight = (role, idOrPIN) => async dispatch => {
  try {
    const url = `/api/api/behavioral-insight/${role}/${idOrPIN}`;
    const res = await axios.get(url);
    dispatch({ type: types.FETCH_BEHAVIORAL_INSIGHT, payload: res.data });
  } catch (error) {
    // must check the error status code before
    history.push('/404err');
  }
};
