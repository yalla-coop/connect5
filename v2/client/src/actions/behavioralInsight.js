import axios from 'axios';

import history from '../history';

import * as types from '../constants/actionTypes';

export const fetchParticipantBehavioral = (url, role) => async dispatch => {
  try {
    const res = await axios.get(url);

    dispatch({
      type: types.FETCH_BEHAVIORAL,
      payload: { data: res.data, role },
    });
  } catch (error) {
    // must check the error status code before
    history.push('/404err');
  }
};

export const fetchSurveyBehavioral = (url, role) => async dispatch => {
  try {
    const res = await axios.get(url);

    dispatch({
      type: types.FETCH_BEHAVIORAL,
      payload: { data: res.data, role },
    });
  } catch (error) {
    // must check the error status code before
    history.push('/404err');
  }
};

export const fetchTrainerBehavioral = (
  url,
  role,
  filters
) => async dispatch => {
  try {
    const res = await axios.post(url, { filters });

    dispatch({
      type: types.FETCH_BEHAVIORAL,
      payload: { data: res.data, role },
    });
  } catch (error) {
    // must check the error status code before
    history.push('/404err');
  }
};
