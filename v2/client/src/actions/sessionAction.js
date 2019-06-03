import axios from 'axios';
import { ADD_SESSION_SUCCESS } from '../constants/actionTypes';
import history from '../history';
// import { returnErrors } from './errorAction';

export const createSessionAction = sessionData => dispatch => {
  axios
    .post('/api/add-session', sessionData)
    .then(res =>
      dispatch({
        type: ADD_SESSION_SUCCESS,
        payload: res.data,
      })
    )
    .catch(() => history.push('./404'));
};
