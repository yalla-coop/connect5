// currently uses params as inputs (trainerId and sessionId) from url
// if only trainerId provided => overall feedback,
// if trainer and session id => individual session feedback

const boom = require('boom');
const { feedback } = require('../../database/queries/feedback/feedback');

module.exports = (req, res, next) => {
  const { trainerId, sessionId, surveyType, role } = req.body;
  return feedback({ trainerId, sessionId, surveyType, role })
    .then(result => res.json(result))
    .catch(err => next(boom.badImplementation('trainer feedback error')));
};
