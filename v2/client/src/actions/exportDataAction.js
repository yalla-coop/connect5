import axios from 'axios';
import { message } from 'antd';

import { EXPORT_DATA_SUCCESS } from '../constants/actionTypes';

export const exportDataAction = (filter, trainerIDs) => async dispatch => {
  axios
    .post(`/api/export-csv`, { filter, trainerIDs })
    .then(({ data }) => dispatch({ type: EXPORT_DATA_SUCCESS, payload: data }))
    .catch(() => message.error('Error! something went wrong'));
};
