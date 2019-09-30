import axios from 'axios';
import { FETCH_ALL_TRAINERS, FETCH_FEEDBACK } from '../constants/actionTypes';
import history from '../history';

export const fetchAllTrainers = () => async dispatch => {
  axios
    .get(`/api/fetch-trainers`)
    .then(res => {
      return dispatch({
        type: FETCH_ALL_TRAINERS,
        payload: res.data,
      });
    })
    .catch(() => history.push('/404err'));
};

export const fetchParticipantFeedBack = PIN => async dispatch => {
  axios
    .get(`/api/feedback/participant/${PIN}`)
    .then(res =>
      dispatch({
        type: FETCH_FEEDBACK,
        payload: res.data,
      })
    )
    .catch(() => history.push('/404err'));
};
