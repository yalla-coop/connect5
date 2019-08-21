import axios from 'axios';
import { Modal } from 'antd';
import { DELETE_ACCOUNT_SUCCESS } from '../constants/actionTypes';
import { logout } from './authAction';

import history from '../history';

export const deleteAccountAction = userId => async dispatch => {
  axios
    .delete(`/api/users/${userId}/deleteAccount`)
    .then(() => {
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
      history.push('/404');
    });
};
