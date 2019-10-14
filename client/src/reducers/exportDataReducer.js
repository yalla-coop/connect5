import { EXPORT_DATA_SUCCESS } from '../constants/actionTypes';

const initialState = {
  data: null,
};

const exportData = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case EXPORT_DATA_SUCCESS:
      return {
        ...state,
        data: payload,
      };

    default:
      return state;
  }
};

export default exportData;
