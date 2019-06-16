import axios from 'axios';
import { Modal } from 'antd';
import { ADD_SESSION_SUCCESS } from '../constants/actionTypes';
import history from '../history';
import store from '../store';

export const createSessionAction = sessionData => dispatch => {
  axios
    .post('/api/add-session', sessionData)
    .then(res =>
      dispatch({
        type: ADD_SESSION_SUCCESS,
        payload: res.data,
      })
    )
    .then(() => {
      const { role } = store.getState().auth;

      Modal.success({
        title: 'Done!',
        content: 'Session created',
        onOk: () =>
          history.push(role === 'trainer' ? 'trainer-sessions' : '/sessions'),
      });
    })
    .catch(err =>
      Modal.error({
        title: 'Error',
        content: err,
        onOk: history.push('/create-session'),
      })
    );
};
