import * as types from '../constants/actionTypes';

const initState = {
  width: '',
};

// general fetched data
const fetchedData = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CHECK_BROWSER_WIDTH:
      return {
        ...state,
        width: payload.width,
        isMobile: payload.isMobile,
        isDeskTop: payload.isDeskTop,
      };

    default:
      return state;
  }
};

export default fetchedData;
