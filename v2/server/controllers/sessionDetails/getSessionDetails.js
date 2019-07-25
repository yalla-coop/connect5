const boom = require('boom');
const {
  getSessionDetails,
} = require('./../../database/queries/sessionDetails/session');
const { getResponseCount } = require('./../../database/queries/feedback');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  getSessionDetails({ id })
    .then(async sessionDetails => {
      if (sessionDetails) {
        // if session go get the response counts for the feedback
        console.log(sessionDetails);
        const responses = await getResponseCount(sessionDetails[0]._id);
        console.log(responses);

        return res.json(sessionDetails);
      }
      return next(boom.notFound('No session founded'));
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
