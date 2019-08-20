import axios from 'axios';
import { Modal } from 'antd';

import history from '../history';

import * as types from '../constants/actionTypes';
import { returnErrors } from './errorAction';

export const fetchUserResults = (id, role) => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${id}/results`, { id, role });
    dispatch({
      type: types.FETCH_USER_RESULTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    history.push('/404err');
  }
};

export const fetchTrainerFeedback = ({
  trainerId,
  sessionId,
  surveyType,
  role,
}) => async dispatch => {
  try {
    const url = `/api/feedback/`;
    const data = { trainerId, sessionId, surveyType, role };

    const res = await axios.post(url, data);

    dispatch({
      type: types.FETCH_OVERALL_TRAINER_FEEDBACK,
      payload: { data: res.data },
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data,
        err.response.status,
        'FETCH_TRAINER_FEEDBACK_FAIL'
      )
    );

    history.push('/404err');
  }
};

export const fetchLocalLeads = () => async dispatch => {
  try {
    const res = await axios.get('/api/local-leads');
    const { data } = res;

    dispatch({
      type: types.FETCH_LOCAL_LEADS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocalLeadTrainersGroup = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/local-lead/${id}/group`);
    dispatch({
      type: types.FETCH_LOCAL_LEAD_TRAINERS_GROUP,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchStatsData = userType => async dispatch => {
  try {
    const res = await axios.post('/api/all/dashboard', { userType });
    const { data } = res;

    dispatch({
      type: types.FETCH_STATS,
      payload: data.stats,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addTrainerToGroup = trianerInfo => async dispatch => {
  try {
    dispatch({
      type: types.LOADING_TRUE,
      payload: 'addTrainerLoading',
    });

    const res = await axios.post('/api/users/local-leads/group', trianerInfo);

    dispatch({
      type: types.ADD_TRAINER_TO_GROUP_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: types.LOADING_FALSE,
      payload: 'addTrainerLoading',
    });
  } catch (error) {
    dispatch({
      type: types.ADD_TRAINER_TO_GROUP_FAIL,
      payload: error.response.data.error,
    });

    dispatch({
      type: types.LOADING_FALSE,
      payload: 'addTrainerLoading',
    });
  }
};

export const checkUserByEmail = email => async dispatch => {
  dispatch({
    type: types.LOADING_TRUE,
    payload: 'forgetPasswordLoading',
  });

  axios
    .get(`/api/users/forget-password/?email=${email}`)
    .then(res => {
      dispatch({
        type: types.CHECK_USER_BY_EMAIL_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: types.LOADING_FALSE,
        payload: 'forgetPasswordLoading',
      });
    })
    .then(() => {
      Modal.success({
        title: 'Password reset email sent!',
        content:
          'We just sent a message to the email you provided with a link to reset your password. Please check your inbox and follow the instructions in the email.',
        onOk: history.push('/login'),
      });
    })
    .catch(() => {
      history.push('/404err');

      dispatch({
        type: types.LOADING_FALSE,
        payload: 'forgetPasswordLoading',
      });
    });
};

export const resetPassword = resetPasswordData => async dispatch => {
  dispatch({
    type: types.LOADING_TRUE,
    payload: 'resetPasswordLoading',
  });

  axios
    .post('/api/users/reset-password', resetPasswordData)
    .then(res => {
      dispatch({
        type: types.RESET_PASSWORD_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: types.LOADING_FALSE,
        payload: 'resetPasswordLoading',
      });
    })
    .then(() =>
      Modal.success({
        title: 'Done!',
        content: 'Password reset successfully',
        onOk: history.push('/login'),
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'RESET_PASSWORD_FAIL'
        )
      );
      dispatch({
        type: types.LOADING_FALSE,
        payload: 'resetPasswordLoading',
      });

      dispatch({
        type: types.RESET_PASSWORD_FAIL,
      });
    });
};
