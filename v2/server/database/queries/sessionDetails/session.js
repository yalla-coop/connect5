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

module.exports.editSessionQuery = async (
  id,
  sessionType,
  startDate,
  inviteesNumber,
  region,
  partnerTrainer1,
  partnerTrainer2,
  emails
) => {
  const trainers = [partnerTrainer1];
  if (partnerTrainer2) {
    trainers.push(partnerTrainer2);
  }
  const session = await Session.findByIdAndUpdate(id, {
    type: sessionType,
    date: startDate,
    numberOfAttendees: inviteesNumber,
    region,
    trainers,
  });

  const changedEmails = [...emails];

  session.participantsEmails.forEach((emailObject, index) => {
    // delete
    if (!emails.includes(emailObject.email)) {
      session.participantsEmails[index].remove();
    } else {
      const changedIndex = changedEmails.indexOf(emailObject.email);
      changedEmails.splice(changedIndex, 1);
    }
  });

  session.participantsEmails = [
    ...session.participantsEmails,
    ...changedEmails.map(item => ({ email: item, confirmed: false })),
  ];

  return session.save();
  // session.type = sessionType;
  // session.date = startDate;
  // session.numberOfAttendees = inviteesNumber;
  // session.region = region;
  // session.trainers = trainers;
  // type: session,
  //   date: startDate,
  //   numberOfAttendees: inviteesNumber,
  //   region,
  //   trainers,
  //   participantsEmails: emails,
};

module.exports.updateEmailsQuery = async (id, participantsEmails) => {
  const session = await Session.findById(id);
  const changedEmails = [...participantsEmails];

  session.participantsEmails.forEach((emailObject, index) => {
    // delete
    if (!participantsEmails.includes(emailObject.email)) {
      session.participantsEmails[index].remove();
    } else {
      const changedIndex = changedEmails.indexOf(emailObject.email);
      changedEmails.splice(changedIndex, 1);
    }
  });

  session.participantsEmails = [
    ...session.participantsEmails,
    ...changedEmails.map(item => ({ email: item, confirmed: false })),
  ];

  return session.save();
};
