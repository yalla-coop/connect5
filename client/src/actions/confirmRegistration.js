import axios from 'axios';
import { Modal } from 'antd';
import {
  CONFIRM_REGISTRATION_SUCCESS,
  CONFIRM_REGISTRATION_ERROR,
  SEND_SPECIAL_REQUIREMENTS_SUCCESS,
  SEND_SPECIAL_REQUIREMENTS_ERROR,
  LOADING_TRUE,
  LOADING_FALSE,
} from '../constants/actionTypes';
import history from '../history';

export const confirmRegistration = ({ email, sessionId }) => dispatch => {
  dispatch({
    type: LOADING_TRUE,
    payload: 'confirmRegistrationLoading',
  });
  axios
    .patch(`/api/sessions/${sessionId}/confirm-email`, {
      email,
      status: 'confirmed',
    })
    .then(({ data }) => {
      dispatch({
        payload: data.confirmedEmail,
        type: CONFIRM_REGISTRATION_SUCCESS,
      });
      dispatch({
        type: LOADING_FALSE,
        payload: 'confirmRegistrationLoading',
      });
    })
    .catch(err => {
      dispatch({
        type: CONFIRM_REGISTRATION_ERROR,
      });
      dispatch({
        type: LOADING_FALSE,
        payload: 'confirmRegistrationLoading',
      });

      Modal.error({
        title: 'Error',
        content: err.response.data.error,
      });
    });
};

export const sendSpecialRequirements = ({
  email,
  sessionId,
  message,
}) => dispatch => {
  dispatch({
    type: LOADING_TRUE,
    payload: 'sendSpecialRequirements',
  });
  axios
    .post(`/api/sessions/${sessionId}/special-requirements`, {
      email,
      message,
    })
    .then(() => {
      dispatch({
        type: SEND_SPECIAL_REQUIREMENTS_SUCCESS,
      });
      dispatch({
        type: LOADING_FALSE,
        payload: 'sendSpecialRequirements',
      });
      Modal.success({
        title: 'Thank You!',
        content: 'You successfully sent your special requirements',
        onOk: () => history.push('/participant-login'),
      });
    })
    .catch(err => {
      dispatch({
        type: SEND_SPECIAL_REQUIREMENTS_ERROR,
      });
      dispatch({
        type: LOADING_FALSE,
        payload: 'sendSpecialRequirements',
      });

      Modal.error({
        title: 'Error',
        content: err.response.data.error,
      });
    });
};
