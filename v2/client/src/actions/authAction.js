import axios from 'axios';

import history from '../history';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CHECK_UNIQUE_EMAIL_UNIQUE,
  CHECK_UNIQUE_EMAIL_UNUNIQUE,
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  ADD_TRAINER_TO_GROUP_SUCCESS,
  CHECK_UNIQUE_EMAIL_ERROR,
  LOGOUT,
} from '../constants/actionTypes';
import { returnErrors } from './errorAction';

// Login User
export const loginUser = loginData => dispatch => {
  const { email, password } = loginData;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/login', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// send a request to register new trainer
export const signUpTrainer = trainerData => async dispatch => {
  try {
    const res = await axios.post('/api/trainers', trainerData);
    const { data } = res;

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// check if the email is unique or not
export const checkUniqeEmail = email => async dispatch => {
  try {
    const res = await axios.get(`/api/users/?email=${email}`);
    const { data } = res;
    if (data.isUnique) {
      dispatch({
        type: CHECK_UNIQUE_EMAIL_UNIQUE,
        payload: data,
      });
    } else {
      dispatch({
        type: CHECK_UNIQUE_EMAIL_UNUNIQUE,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_TRAINER_TO_GROUP_SUCCESS,
      payload: error.response.data.error,
    });
    dispatch({
      type: CHECK_UNIQUE_EMAIL_ERROR,
      payload: error.response.data.error,
    });
  }
};

// check if user is logged in or not and get the user info
export const checkAuth = () => async dispatch => {
  try {
    const res = await axios.get(`/api/users/auth`);
    const { data } = res;

    dispatch({
      type: USER_AUTHENTICATED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UNAUTHENTICATED,
    });
  }
};

// Login participant
export const loginParticipant = PIN => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ PIN });

  axios
    .post('/api/participant-login', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logout = () => async dispatch => {
  try {
    await axios.get('/api/logout');
    history.push('/');
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log('err', error);
  }
};
