const boom = require('boom');
const {
  getAllLocalLeads,
} = require('./../../database/queries/users/localLead');

module.exports = async (req, res, next) => {
  getAllLocalLeads()
    .then(localLeads => {
      if (localLeads || localLeads.length) {
        return res.json(localLeads);
      }
      return next(boom.notFound('No local leads founded'));
    })
    .catch(err => {
      boom.badImplementation(err);
    });
};
