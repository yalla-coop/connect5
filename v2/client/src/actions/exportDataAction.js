import axios from 'axios';
import { message } from 'antd';

import { EXPORT_DATA_SUCCESS } from '../constants/actionTypes';

export const exportDataAction = (filters, cb) => async dispatch => {
  axios
    .post(`/api/export-csv`, { filters })
    .then(({ data }) => {
      return dispatch({ type: EXPORT_DATA_SUCCESS, payload: data });
    })
    .then(cb)
    .catch(() => message.error('Error! something went wrong'));
};
