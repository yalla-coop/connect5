import * as types from '../constants/actionTypes';

export const setFilters = (value, key) => {
  return {
    type: types.SET_FILTERS,
    payload: {
      value,
      key,
    },
  };
};

export const resetFilters = () => {
  return {
    type: types.RESET_FILTERS,
  };
};
