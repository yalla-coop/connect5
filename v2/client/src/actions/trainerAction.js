import axios from 'axios';
import { FETCH_ALL_TRAINERS } from '../constants/actionTypes';
import history from '../history';

export const fetchAllTrainers = () => async dispatch => {
  const res = await axios
    .get(`/api/fetch-trainers`)
    .then(res =>
      dispatch({
        type: FETCH_ALL_TRAINERS,
        payload: res.data,
      })
    )
    .catch(err => history.push('/404err'));
};
