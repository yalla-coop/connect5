import axios from 'axios';
import { Modal, message } from 'antd';
import {
  DELETE_ACCOUNT_SUCCESS,
  LOADING_FALSE,
  LOADING_TRUE,
} from '../constants/actionTypes';
import { logout } from './authAction';

export const deleteAccountAction = userId => async dispatch => {
  dispatch({
    type: LOADING_TRUE,
    payload: 'deleteAccountLoading',
  });

  axios
    .delete(`/api/users/${userId}`)
    .then(() => {
      dispatch({
        type: LOADING_FALSE,
        payload: 'deleteAccountLoading',
      });

      dispatch({
        type: DELETE_ACCOUNT_SUCCESS,
      });
    })
    .then(() => {
      Modal.success({
        title: 'Done!',
        content: 'Account deleted successfully',
        onOk() {
          dispatch(logout());
        },
      });
    })
    .catch(err => {
      dispatch({
        type: LOADING_FALSE,
        payload: 'deleteAccountLoading',
      });

      const error =
        err.response && err.response.data && err.response.data.error;
      message.error(error || 'Something went wrong');
    });
};
