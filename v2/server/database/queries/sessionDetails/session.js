const mongoose = require('mongoose');
const Session = require('./../../models/Session');

const getSessionDetails = id => {
  return Session.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'trainers',
        foreignField: '_id',
        as: 'trainers',
      },
    },
  ]);
};

module.exports = { getSessionDetails };

// module.exports.getSessionDetails = id => {
//   return Session.findById({ _id: id });
// };
