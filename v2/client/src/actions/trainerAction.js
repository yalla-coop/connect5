import axios from 'axios';
import {
  FETCH_ALL_TRAINERS,
  PARTICIPANT_FEEDBACK_SUCCESS,
} from '../constants/actionTypes';
import history from '../history';

export const fetchAllTrainers = () => async dispatch => {
  axios
    .get(`/api/fetch-trainers`)
    .then(res =>
      dispatch({
        type: FETCH_ALL_TRAINERS,
        payload: res.data,
      })
    )
    .catch(() => history.push('/404err'));
};

export const fetchParticipantFeedBack = PIN => async dispatch => {
  axios
    .get(`/api/feedback/participant/${PIN}`)
    .then(res =>
      dispatch({
        type: PARTICIPANT_FEEDBACK_SUCCESS,
        payload: res.data,
      })
    )
    .catch(() => history.push('/404err'));
};
