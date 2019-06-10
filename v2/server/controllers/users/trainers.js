const boom = require('boom');
const { getAllTrainers } = require('./../../database/queries/users/trainers');

module.exports = (req, res, next) => {
  getAllTrainers()
    .then(trainers => {
      if (!trainers) {
        return next(boom.notFound('No trainer founded'));
      }
      return res.json(trainers);
    })
    .catch(err => {
      boom.badImplementation();
    });
};
