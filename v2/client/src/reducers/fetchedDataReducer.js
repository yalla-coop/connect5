import * as types from '../constants/actionTypes';

const initState = {
  localLeadsList: [],
  localLeadGroup: [],
};

// general fetched data
const fetchedData = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_LOCAL_LEADS:
      return { ...state, localLeadsList: payload };
    case types.FETCH_LOCAL_LEAD_TRAINERS_GROUP:
      return { ...state, localLeadGroup: payload };
    default:
      return state;
  }
};

export default fetchedData;
