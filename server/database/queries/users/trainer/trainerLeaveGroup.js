const mongoose = require('mongoose');
const User = require('../../../models/User');

module.exports.trainerLeaveGroup = (localLeadId, trainerId) => {
  return User.update(
    {},
    { $pull: { managers: { $in: [localLeadId] }, trainersGroup: trainerId } },
    { multi: true }
  );
};
