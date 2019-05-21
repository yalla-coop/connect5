import axios from 'axios';
import {
  ADD_SESSION_SUCCESS,
  ADD_SESSION_FAIL,
} from '../constants/actionTypes';
import { returnErrors } from './errorAction';

export const createSessionAction = sessionData => dispatch => {
  axios
    .post('/api/add-session', sessionData)
    .then(res =>
      dispatch({
        type: ADD_SESSION_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ADD_SESSION_FAIL')
      );
      dispatch({
        type: ADD_SESSION_FAIL,
      });
    });
};
