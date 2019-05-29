import axios from 'axios';

import history from '../history';

import * as types from '../constants/actionTypes';

export const fetchbehavioralInsight = (url, role) => async dispatch => {
  try {
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
