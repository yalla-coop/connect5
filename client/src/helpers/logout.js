import axios from 'axios';

const logout = () => {
  axios
    .get('/api/logout')
    .then(() => (window.location = '/'))
    .catch(err => console.error(err));
};

export default logout;
