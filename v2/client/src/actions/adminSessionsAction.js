import axios from 'axios';
// import { Modal } from 'antd';
import { FETCH_SESSIONS_PER_REGIONS } from '../constants/actionTypes';
import history from '../history';
// import store from '../store';

export const fetchSessionsPerRegions = () => async dispatch => {
  axios
    .get(`/api/users/admin/all-sessions-per-region`)
    .then(res =>
      dispatch({
        type: FETCH_SESSIONS_PER_REGIONS,
        payload: res.data,
      })
    )
    .catch(() => history.push('/404err'));
};
