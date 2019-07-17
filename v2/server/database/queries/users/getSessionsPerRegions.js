const Session = require('../../models/Session');

module.exports.getSessionsPerRegionsQuery = () => {
  return Session.aggregate([
    {
      $match: {},
    },
    {
      $project: {
        region: 1,
      },
    },
    {
      $group: {
        _id: '$region',
        session: { $sum: 1 },
      },
    },
  ]);
};
