const boom = require('boom');
const jwt = require('jsonwebtoken');
const { tokenMaxAge } = require('./../constants');
const { findParticipantByPIN } = require('./../database/queries/user');

module.exports = (req, res, next) => {
  const { PIN } = req.body;
  findParticipantByPIN(PIN)
    .then(participant => {
      if (!participant) {
        // participant is not found
        return next(boom.unauthorized('login failed, PIN is not exist'));
      }

      // data to be sent in the participant
      const responseInfo = {
        id: participant._id,
        PIN: participant.PIN,
        role: 'participant',
      };

      // create token for 25 day
      const token = jwt.sign(responseInfo, process.env.SECRET, {
        expiresIn: tokenMaxAge.string,
      });

      res.cookie('token', token, {
        maxAge: tokenMaxAge.number,
        httpOnly: true,
      });

      // send the participant info
      return res.json(responseInfo);
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
