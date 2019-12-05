const boom = require('boom');
const jwt = require('jsonwebtoken');
const { tokenMaxAge } = require('./../constants');
const {
  findParticipantByPIN,
  findSessionsIncludeParticipantEmail,
} = require('./../database/queries/user');

module.exports = async (req, res, next) => {
  const { PIN, email } = req.body;
  try {
    let participant;
    let responseInfo;
    let sessions;
    if (PIN) {
      participant = await findParticipantByPIN(PIN);
      if (!participant) {
        // participant is not found
        return next(boom.unauthorized('login failed, PIN is not exist'));
      }

      // data to be sent in the participant
      responseInfo = {
        id: participant._id,
        PIN: participant.PIN,
        role: 'participant',
      };
    } else if (email) {
      sessions = await findSessionsIncludeParticipantEmail(email);
      responseInfo = {
        email,
        role: 'participant',
      };
      if (!sessions || sessions.length < 1) {
        return next(
          boom.unauthorized('login failed, your email has no related sessions')
        );
      }
    } else {
      return next(boom.badData('should submit your email or PIN'));
    }

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
  } catch (error) {
    return next(boom.badImplementation());
  }
};
