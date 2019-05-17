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
