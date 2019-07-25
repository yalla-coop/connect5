import axios from 'axios';
import { message } from 'antd';
import history from '../history';

import {
  SEND_INVITATION_SUCCESS,
  UPDATE_SENT_EMAILS_SUCCESS,
} from '../constants/actionTypes';

import { fetchSessionDetails } from './groupSessionsAction';

export const SendEmailInvitation = Data => async dispatch => {
  const { _id } = Data;
  axios
    .post('/api/users/send-invitation', Data)
    .then(res => {
      message.success('Done, Emails sent successfully!');
      dispatch(fetchSessionDetails(_id));
      return dispatch({
        type: SEND_INVITATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => {
      message.error('Error! something went wronge');
      history.push('/404err');
    });
};

export const updateSentEmails = Data => async dispatch => {
  const { _id } = Data;
  axios
    .post('/api/users/update-sent-emails', Data)
    .then(res => {
      message.success('Done, Emails sent successfully!');
      dispatch(fetchSessionDetails(_id));
      return dispatch({
        type: UPDATE_SENT_EMAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => {
      message.error('Error! something went wronge');
      history.push('/404err');
    });
};
