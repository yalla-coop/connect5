const boom = require('boom');
const {
  updateEmailsQuery,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const { participantsEmails } = req.body;
  const { id } = req.params;
  updateEmailsQuery(id, participantsEmails)
    .then(() => {
      return res.json('success');
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
