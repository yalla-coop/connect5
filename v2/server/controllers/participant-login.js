const boom = require('boom');
const jwt = require('jsonwebtoken');
const { tokenMaxAge } = require('./../database/DBConstants');
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

      // create token for 25 day
      const token = jwt.sign({ pin: response.pin }, process.env.SECRET, {
        expiresIn: tokenMaxAge.string,
      });
      res.cookie('token', token, {
        maxAge: tokenMaxAge.number,
        httpOnly: true,
      });

      // send the response info
      return res.json(responseInfo);
    })
    .catch(err => next(boom.badImplementation()));
};
