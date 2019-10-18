import axios from 'axios';
import { Modal } from 'antd';
import {
  ADD_SESSION_SUCCESS,
  GET_SESSION_DETAILS_BY_SHORT_ID,
  UPDATE_ATTENDEES_SUCCESS,
  LOADING_START,
  LOADING_END,
  EMAIL_SCHEDULE_SUCCESS,
  STORE_SESSION_DATA,
  LOADING_TRUE,
  LOADING_FALSE,
  CLEAR_SESSION_DATA,
} from '../constants/actionTypes';

import history from '../history';

import { fetchSessionDetails } from './groupSessionsAction';

export const createSessionAction = (sessionData, done) => dispatch => {
  dispatch({
    type: LOADING_START,
  });

  axios
    .post('/api/add-session', sessionData)
    .then(res => {
      dispatch({
        type: ADD_SESSION_SUCCESS,
        payload: res.data,
      });
    })
    .then(() => {
      done();
    })
    .catch(err => {
      done(err);
      dispatch({
        type: LOADING_END,
      });

      return Modal.error({
        title: 'Error',
        content: 'Error in creating session',
        onOk: history.push('/create-session'),
      });
    });
};

export const storeInputData = data => async dispatch => {
  dispatch({
    type: STORE_SESSION_DATA,
    payload: data,
  });
};

export const clearInputData = () => async dispatch => {
  dispatch({
    type: CLEAR_SESSION_DATA,
    payload: {},
  });
};

export const getSessionDetails = shortId => dispatch => {
  axios
    .get(`/api/sessions?shortId=${shortId}`)
    .then(res =>
      dispatch({
        type: GET_SESSION_DETAILS_BY_SHORT_ID,
        payload: res.data,
      })
    )
    .catch(err => {
      if (err.response.status === 404) {
        return Modal.error({
          title: 'Session Not Found!',
          content: 'The session You are looking for is not avaliable',
          onOk: () => history.push('/404err'),
        });
      }
      return history.push('/500err');
    });
};

export const updateSessionAttendeesList = ({
  sessionId,
  participantsEmails,
  status,
  handleCloseDrawer,
}) => dispatch => {
  // start loading
  dispatch({
    type: LOADING_START,
  });

  axios
    .patch(`/api/sessions/${sessionId}/attendeesList`, {
      participantsEmails,
      status,
    })
    .then(res => {
      dispatch({
        type: UPDATE_ATTENDEES_SUCCESS,
        payload: res.data,
      });

      Modal.success({
        title: 'Done!',
        content: 'Attendees List updated succesfully',
        onOk: handleCloseDrawer,
      });

      return dispatch(fetchSessionDetails(sessionId));
    })
    .catch(error => {
      // end loading
      dispatch({
        type: LOADING_END,
      });
      return Modal.error({
        title: 'Error!',
        content: error.response.data.error,
        onOk: handleCloseDrawer,
      });
    });
};

export const sendEmailReminder = (
  { sessionId, type, ...emailData },
  handleCloseDrawer
) => dispatch => {
  dispatch({
    type: LOADING_TRUE,
    payload: 'sendEmail',
  });

  axios
    .post(`/api/sessions/${sessionId}/emails?type=${type}`, {
      ...emailData,
      type,
    })
    .then(res => {
      dispatch({
        type: UPDATE_ATTENDEES_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: LOADING_FALSE,
        payload: 'sendEmail',
      });

      handleCloseDrawer();
      return dispatch(fetchSessionDetails(sessionId));
    })
    .catch(error => {
      dispatch({
        type: LOADING_FALSE,
        payload: 'sendEmail',
      });

      return Modal.error({
        title: 'Error!',
        content: error.response.data.error,
      });
    });
};

export const scheduleNewEmail = (emailData, cb) => dispatch => {
  // start loading
  dispatch({
    type: LOADING_TRUE,
    payload: 'sendEmail',
  });

  axios
    .post(`/api/sessions/${emailData.sessionId}/scheduled-emails`, emailData)
    .then(res => {
      dispatch({
        type: EMAIL_SCHEDULE_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: LOADING_FALSE,
        payload: 'sendEmail',
      });

      cb();
      return dispatch(fetchSessionDetails(emailData.sessionId));
    })
    .catch(error => {
      // end loading
      dispatch({
        type: LOADING_FALSE,
        payload: 'sendEmail',
      });

      return Modal.error({
        title: 'Error!',
        content: error.response.data.error,
      });
    });
};

export const cancelScheduledEmail = ({
  sessionId,
  scheduledEmailId,
}) => dispatch => {
  // start loading
  axios
    .delete(`/api/sessions/${sessionId}/scheduled-emails/${scheduledEmailId}`)
    .then(() => {
      Modal.success({
        title: 'Done!',
        content: 'Email successfully canceled',
      });

      return dispatch(fetchSessionDetails(sessionId));
    })
    .catch(error => {
      // end loading
      dispatch({
        type: LOADING_END,
      });

      return Modal.error({
        title: 'Error!',
        content: error.response.data.error,
      });
    });
};
