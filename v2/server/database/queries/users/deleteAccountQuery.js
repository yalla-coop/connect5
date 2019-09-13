const mongoose = require('mongoose');

const User = require('../../models/User');

module.exports.deleteAccount = (userId, usersArray, fieldName) => {
  const ObjeIds = usersArray.map(id => mongoose.Types.ObjectId(id));
  return User.bulkWrite([
    {
      updateMany: {
        filter: { _id: { $in: ObjeIds } },
        update: {
          $pullAll: { [fieldName]: [mongoose.Types.ObjectId(userId)] },
        },
      },
    },
    {
      deleteOne: {
        filter: { _id: mongoose.Types.ObjectId(userId) },
      },
    },
  ]);
};
