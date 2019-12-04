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
  LOADING_TRUE,
  LOADING_FALSE,
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

  dispatch({
    type: LOADING_TRUE,
    payload: 'loginLoading',
  });

  axios
    .post('/api/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: LOADING_FALSE,
        payload: 'loginLoading',
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOADING_FALSE,
        payload: 'loginLoading',
      });
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// send a request to register new trainer
export const signUpTrainer = trainerData => async dispatch => {
  try {
    dispatch({
      type: LOADING_TRUE,
      payload: 'signupLoading',
    });
    const res = await axios.post('/api/trainers', trainerData);
    const { data } = res;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
      payload: 'signupLoading',
    });
  } catch (error) {
    dispatch({
      type: LOADING_FALSE,
      payload: 'signupLoading',
    });
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
export const loginParticipant = ({ PIN, email }) => dispatch => {
  dispatch({
    type: LOADING_TRUE,
    payload: 'loginParticipantsLoading',
  });
  axios
    .post('/api/participant-login', { PIN, email })
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: LOADING_FALSE,
        payload: 'loginParticipantsLoading',
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: LOADING_FALSE,
        payload: 'loginParticipantsLoading',
      });
    });
};

export const logout = () => async dispatch => {
  try {
    console.log('here');
    await axios.get('/api/logout');
    history.push('/');
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log('err', error);
  }
};
