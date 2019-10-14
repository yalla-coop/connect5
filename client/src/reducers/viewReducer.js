import { UPDATE_VIEW_LEVEL } from '../constants/actionTypes';

const initialState = {
  viewLevel: null,
};

const setViewLevel = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_VIEW_LEVEL:
      return {
        ...state,
        viewLevel: payload,
      };

    default:
      return state;
  }
};

export default setViewLevel;
