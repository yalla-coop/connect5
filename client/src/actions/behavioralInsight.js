import axios from 'axios';

import history from '../history';

import * as types from '../constants/actionTypes';

export const fetchTrainerBehavioral = (filters, cb) => async dispatch => {
  try {
    const res = await axios.post('/api/behavioral-insight', { filters });

    dispatch({
      type: types.FETCH_BEHAVIORAL,
      payload: { data: res.data },
    });
    cb();
  } catch (error) {
    // must check the error status code before
    history.push('/404err');
  }
};
