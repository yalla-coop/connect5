import axios from 'axios';
import { Modal } from 'antd';
import {
  CONFIRM_REGISTRATION_SUCCESS,
  CONFIRM_REGISTRATION_ERROR,
} from '../constants/actionTypes';
import history from '../history';

export const confirmRegistration = ({ email, sessionId }) => dispatch => {
  axios
    .patch(`/api/sessions/${sessionId}/confirm-email`, {
      email,
      status: 'confirmed',
    })
    .then(() => {
      dispatch({
        type: CONFIRM_REGISTRATION_SUCCESS,
      });

      Modal.success({
        title: 'Thank You!',
        content: 'You successfully confirmed your registration',
        onOk: () => history.push('/participant-login'),
      });
    })
    .catch(err => {
      dispatch({
        type: CONFIRM_REGISTRATION_ERROR,
      });

      Modal.error({
        title: 'Error',
        content: err.response.data.error,
      });
    });
};
