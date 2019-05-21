const boom = require('boom');
const createNewsession = require('./../database/queries/add_session');

const addSession = (req, res, next) => {
  const {
    session,
    startDate,
    inviteesNumber,
    region,
    partnerTrainer1,
    partnerTrainer2,
    emails,
  } = req.body;

  if (
    session &&
    startDate &&
    inviteesNumber &&
    region &&
    partnerTrainer1 &&
    partnerTrainer2 &&
    emails
  ) {
    return createNewsession({
      startDate,
      session,
      inviteesNumber,
      region,
      partnerTrainer1,
      partnerTrainer2,
      emails,
    })
      .then(addedSession => {
        return res.json(addedSession);
      })

      .catch(err => next(boom.badImplementation()));
  }
  return next(boom.badRequest('Some arguments are missed'));
};

module.exports = addSession;
