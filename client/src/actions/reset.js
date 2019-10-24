// reset the store data

import * as types from '../constants/actionTypes';

export const resetgroup = () => {
  return {
    type: types.RESET_GROUPS_STATE,
  };
};

export const resetUniqueEmail = () => {
  return {
    type: types.RESET_UNIQUE_EMAIL,
  };
};
