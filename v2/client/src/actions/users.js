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
