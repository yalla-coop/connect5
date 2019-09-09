import axios from 'axios';
import { message } from 'antd';
import history from '../history';

import {
  UPDATE_SENT_EMAILS_SUCCESS,
  LOADING_START,
  LOADING_END,
} from '../constants/actionTypes';

import { fetchSessionDetails } from './groupSessionsAction';

export const updateSentEmails = updatedEmailsList => async dispatch => {
  const { sessionId } = updatedEmailsList;
  dispatch({
    type: LOADING_START,
  });
  axios
    .post('/api/users/update-sent-emails', updatedEmailsList)
    .then(res => {
      message.success('Done, Emails sent successfully!');
      dispatch(fetchSessionDetails(sessionId));
      dispatch({
        type: LOADING_END,
      });
      return dispatch({
        type: UPDATE_SENT_EMAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: LOADING_END,
      });
      message.error('Error! something went wronge');
      history.push('/404err');
    });
};
