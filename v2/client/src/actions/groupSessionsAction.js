import axios from 'axios';
import { message, Modal } from 'antd';
import Swal from 'sweetalert2';

import {
  FETCH_ALL_SESSIONS,
  FETCH_TRAINERS_SESSIONS,
  FETCH_LOCAL_LEAD_SESSIONS,
  FETCH_SESSION_DETAILS,
  DELETE_SESSION_SUCCESS,
  EDIT_SESSION_SUCCESS,
  UPDATE_EMAILS_SUCCESS,
  SEND_SURVEY_EMAIL_SUCCESS,
  FETCH_PRTICIPENT_SESSIONS_SUCCESS,
  LOADING_FALSE,
  LOADING_TRUE,
} from '../constants/actionTypes';

import { MY_SESSIONS_URL } from '../constants/navigationRoutes';
import history from '../history';

export const fetchTrainerSessions = id => async dispatch => {
  axios
    .get(`/api/users/trainer-sessions/${id}`)
    .then(res =>
      dispatch({
        type: FETCH_TRAINERS_SESSIONS,
        payload: res.data,
      })
    )
    .catch(() => history.push('/404err'));
};

export const fetchLocalLeadSessions = id => async dispatch => {
  axios
    .get(`/api/users/sessions/${id}`)
    .then(res =>
      dispatch({
        type: FETCH_LOCAL_LEAD_SESSIONS,
        payload: res.data,
      })
    )
    .catch(() => {
      history.push('/404err');
    });
};

export const fetchALLSessions = () => async dispatch => {
  axios
    .get(`/api/users/sessions`)
    .then(res =>
      dispatch({
        type: FETCH_ALL_SESSIONS,
        payload: res.data,
      })
    )
    .catch(() => history.push('/404err'));
};

export const fetchSessionDetails = id => async dispatch => {
  axios
    .get(`/api/session-details/${id}`)
    .then(res =>
      dispatch({
        type: FETCH_SESSION_DETAILS,
        payload: res.data,
      })
    )
    .catch(() => history.push('/404err'));
};

export const deleteSessionAction = id => async dispatch => {
  axios
    .delete(`/api/session-delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_SESSION_SUCCESS,
        payload: res.data,
      })
    )
    .then(() => {
      Modal.success({
        title: 'success',
        content: 'session has been successfully delete',
        onOk: () => history.push(MY_SESSIONS_URL),
      });
    })
    .catch(() => history.push('/404err'));
};

export const sessionUpdateAction = (sessionData, id) => async dispatch => {
  // const body = JSON.stringify(sessionData);

  dispatch({
    type: LOADING_TRUE,
    payload: 'sessionEditLoading',
  });

  axios
    .patch(`/api/session-edit/${id}`, sessionData)
    .then(res => {
      Swal.fire({
        title: 'success',
        text: 'session has been successfully edited',
        type: 'success',
        confirmButtonText: 'Ok',
      });
      history.push(`/session-details/${id}`);

      dispatch({
        type: EDIT_SESSION_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: LOADING_FALSE,
        payload: 'sessionEditLoading',
      });
    })
    .catch(() => {
      dispatch({
        type: LOADING_FALSE,
        payload: 'sessionEditLoading',
      });
      history.push('/404err');
    });
};

export const updateEmails = (id, participantsEmails) => async dispatch => {
  axios
    .patch(`/api/emails-update/${id}`, { participantsEmails })
    .then(res => {
      dispatch(fetchSessionDetails(id));
      return dispatch({
        type: UPDATE_EMAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => history.push('/404err'));
};

export const sendEmails = ({
  surveyURL,
  participantsList,
  surveyType,
}) => async dispatch => {
  axios
    .post('/api/survey/email', {
      surveyURL,
      participantsList,
      surveyType,
    })
    .then(res => {
      message.success('Done, Emails sent successfully!');
      return dispatch({
        type: SEND_SURVEY_EMAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => {
      message.error('Error! something went wronge');
      history.push('/404err');
    });
};

export const fetchParticipentSessions = pin => async dispatch => {
  try {
    const res = await axios.get(`/api/participant/${pin}/progress`);
    return dispatch({
      type: FETCH_PRTICIPENT_SESSIONS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    message.error('Error! something went wronge');
    return history.push('/404err');
  }
};
