import axios from 'axios';
import {
  CHANGE_PASSWORD_SUCCESS,
  // CHANGE_PASSWORD_FAIL
} from '../constants/actionTypes';
import history from '../history';

export const changePasswordActionCreator = data => async dispatch => {
  axios
    .post('/api/users/change-password', data)
    .then(res =>
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: res.data,
      })
    )
    .catch(() => history.push('./404'));
};
