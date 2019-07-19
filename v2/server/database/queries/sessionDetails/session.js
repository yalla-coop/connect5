const mongoose = require('mongoose');
const Session = require('./../../models/Session');

module.exports.getSessionById = id => Session.findById(id);

module.exports.getSessionDetails = id => {
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

module.exports.deleteSession = id => {
  return Session.findByIdAndDelete(id);
};

module.exports.editSessionQuery = (
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
) => {
  const trainers = [partnerTrainer1];
  if (partnerTrainer2) {
    trainers.push(partnerTrainer2);
  }
  return Session.findByIdAndUpdate(id, {
    type: session,
    date: startDate,
    numberOfAttendees: inviteesNumber,
    region,
    trainers,
    participantsEmails: emails,
    startTime,
    endTime,
    address,
  });
};

module.exports.updateEmailsQuery = (id, participantsEmails) => {
  return Session.findByIdAndUpdate(id, {
    participantsEmails,
  });
};
