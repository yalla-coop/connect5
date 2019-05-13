import axios from "axios";

// function to automatically set auth header to every request once user logged in
const setAuthToken = (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common.Authorization = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthToken;
