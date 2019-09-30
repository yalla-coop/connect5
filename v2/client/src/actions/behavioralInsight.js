import axios from 'axios';

import history from '../history';

import * as types from '../constants/actionTypes';

export const fetchTrainerBehavioral = (url, filters) => async dispatch => {
  try {
    const res = await axios.post(url, { filters });

    dispatch({
      type: types.FETCH_BEHAVIORAL,
      payload: { data: res.data },
    });
  } catch (error) {
    // must check the error status code before
    history.push('/404err');
  }
};
