const boom = require('boom');
const {
  editSessionQuery,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  const {
    session,
    startDate,
    inviteesNumber,
    region,
    partnerTrainer1,
    partnerTrainer2,
    emails,
  } = data;
  editSessionQuery(
    id,
    session,
    startDate,
    inviteesNumber,
    region,
    partnerTrainer1,
    partnerTrainer2,
    emails
  )
    .then(() => {
      return res.json('success');
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
