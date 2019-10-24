import axios from 'axios';
import { Modal } from 'antd';
import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  LOADING_TRUE,
  LOADING_FALSE,
} from '../constants/actionTypes';
import { returnErrors } from './errorAction';
import history from '../history';

export const changePasswordActionCreator = data => async dispatch => {
  dispatch({
    type: LOADING_TRUE,
    payload: 'changePasswordLoading',
  });
  axios
    .post('/api/users/change-password', data)
    .then(res => {
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: LOADING_FALSE,
        payload: 'changePasswordLoading',
      });
    })
    .then(() => {
      Modal.success({
        title: 'Done!',
        content: 'Password Changed',
        onOk: history.push('/dashboard'),
      });
      dispatch({
        type: LOADING_FALSE,
        payload: 'changePasswordLoading',
      });
    })

    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'CHANGE_PASSWORD_FAIL'
        )
      );
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
      });
    });
};
