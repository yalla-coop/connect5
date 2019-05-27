const boom = require('boom');
const {
  getSessionDetails,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  getSessionDetails(id)
    .then(sessionDetails => {
      if (sessionDetails) {
        console.log(sessionDetails, 'hhhhhhhhhhhhhhhhhhhhh');
        return res.json(sessionDetails);
      }
      return next(boom.notFound('No session founded'));
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
