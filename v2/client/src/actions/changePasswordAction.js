import axios from 'axios';
import { Modal } from 'antd';
import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from '../constants/actionTypes';
import { returnErrors } from './errorAction';
import history from '../history';

export const changePasswordActionCreator = data => async dispatch => {
  axios
    .post('/api/users/change-password', data)
    .then(res =>
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: res.data,
      })
        .then(() =>
          Modal.success({
            title: 'Done!',
            content: 'Password Changed',
            onOk: history.push('/dashboard'),
          })
        )
        .catch(err =>
          Modal.error({
            title: 'Error',
            content: err,
            onOk: history.push('/change-password'),
          })
        )
    )
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
