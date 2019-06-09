import axios from 'axios';
import {
  FETCH_ALL_SESSIONS,
  FETCH_TRAINERS_SESSIONS,
  FETCH_LOCAL_LEAD_SESSIONS,
} from '../constants/actionTypes';
import history from '../history';

export const fetchTrainerSessions = id => async dispatch => {
  axios
    .get(`/api/users/trainer-sessions/${id}`)
    .then(res =>
      dispatch({
        type: FETCH_TRAINERS_SESSIONS,
        payload: res.data,
      })
    )
    .catch(() => history.push('./404'));
};

export const fetchLocalLeadSessions = id => async dispatch => {
  axios
    .get(`/api/users/sessions/${id}`)
    .then(res =>
      dispatch({
        type: FETCH_LOCAL_LEAD_SESSIONS,
        payload: res.data,
      })
    )
    .catch(() => history.push('./404'));
};

export const fetchALLSessions = () => async dispatch => {
  axios
    .get(`/api/users/sessions`)
    .then(res =>
      dispatch({
        type: FETCH_ALL_SESSIONS,
        payload: res.data,
      })
    )
    .catch(() => history.push('./404'));
};
