import { UPDATE_VIEW_LEVEL } from '../constants/actionTypes';

import history from '../history';

// set view level the user wants to use the app in (e.g. trainer or admin)
export const updateViewLevel = viewLevel => dispatch => {
  try {
    dispatch({
      type: UPDATE_VIEW_LEVEL,
      payload: viewLevel,
    });
  } catch (errorr) {
    history.push('/404err');
  }
};
