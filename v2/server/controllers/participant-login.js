const boom = require('boom');
const { findByPIN } = require('./../database/queries/user');

module.exports = (req, res, next) => {
  const { PIN } = req.body;
  findByPIN(PIN)
    .then(response => {
      if (!response) {
        // response is not found
        return next(boom.unauthorized('login failed, PIN is not exist'));
      }

      // data to be sent in the response
      const responseInfo = {
        id: response._id,
        trainers: response.trainers,
        pin: response.PIN,
        surveyType: response.surveyType,
        session: response.session,
      };

      // send the response info
      return res.json(responseInfo);
    })
    .catch(err => next(boom.badImplementation()));
};
