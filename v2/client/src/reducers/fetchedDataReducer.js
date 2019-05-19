import * as types from '../constants/actionTypes';

const initState = { localLeadsList: [] };

// general fetched data
const fetchedData = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_LOCAL_LEADS:
      return { ...state, localLeadsList: payload };

    default:
      return state;
  }
};

export default fetchedData;
