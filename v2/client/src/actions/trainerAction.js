import axios from 'axios';
import { FETCH_ALL_TRAINERS } from '../constants/actionTypes';
import history from '../history';

export const fetchAllTrainers = () => async dispatch => {
  axios
    .get(`/api/fetch-trainers`)
    .then(res => {
      return dispatch({
        type: FETCH_ALL_TRAINERS,
        payload: res.data,
      });
    })
    .catch(() => history.push('/404err'));
};
