import axios from 'axios';

import { GET_PARTICIPANTS_DEMOGRAPHIC_SUCCESS } from '../constants/actionTypes';
import history from '../history';

export const getParticipantDemographic = () => dispatch => {
  axios
    .get(`/api/users/admin/demographics/participant`)
    .then(res =>
      dispatch({
        type: GET_PARTICIPANTS_DEMOGRAPHIC_SUCCESS,
        payload: res.data,
      })
    )
    .catch(() => history.push('/404err'));
};
