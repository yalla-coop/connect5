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
    startTime,
    endTime,
    postcode,
    addressLine1,
    addressLine2,
  } = data;

  const address = {
    postcode,
    addressLine1,
    addressLine2,
  };

  editSessionQuery(
    id,
    session,
    startDate,
    inviteesNumber,
    region,
    partnerTrainer1,
    partnerTrainer2,
    emails,
    startTime,
    endTime,
    address
  )
    .then(() => {
      return res.json('success');
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
