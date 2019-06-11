import axios from 'axios';

import history from '../history';

const logout = () => {
  axios
    .get('/api/logout')
    .then(() => (window.location = '/'))
    .catch(err => console.error(err));
};

export default logout;
