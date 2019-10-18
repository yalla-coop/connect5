import { CHECK_BROWSER_WIDTH } from '../constants/actionTypes';

import history from '../history';

export const checkBrowserWidth = data => dispatch => {
  try {
    dispatch({
      type: CHECK_BROWSER_WIDTH,
      payload: data,
    });
  } catch (errorr) {
    history.push('/404err');
  }
};
