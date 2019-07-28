const mongoose = require('mongoose');
const Session = require('./../../models/Session');

module.exports.getSessionById = id => Session.findById(id);

module.exports.getSessionDetails = ({ id, shortId }) => {
  let match;
  if (id) {
    match = { $match: { _id: mongoose.Types.ObjectId(id) } };
  } else if (shortId) {
    match = { $match: { shortId } };
  }

  return Session.aggregate([
    match,
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
  emails,
  startTime,
  endTime,
  address
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
    participantsEmails: emails,
    startTime,
    endTime,
    address,
  });

  return session.save();
};

module.exports.updateEmailsQuery = async (id, participantsEmails) => {
  const session = await Session.findById(id);
  const changedEmails = [...participantsEmails];

  session.participantsEmails.forEach((emailObject, index) => {
    // delete
    if (!participantsEmails.includes(emailObject.email)) {
      session.participantsEmails[index].remove();
    } else {
      // skip
      const changedIndex = changedEmails.indexOf(emailObject.email);
      changedEmails.splice(changedIndex, 1);
    }
  });

  // add the new emails
  session.participantsEmails = [
    ...session.participantsEmails,
    ...changedEmails.map(item => ({ email: item, status: 'new' })),
  ];

  return session.save();
};

module.exports.updateEmailStatus = async ({ sessionId, email, status }) => {
  return Session.updateOne(
    { _id: sessionId, 'participantsEmails.email': email },
    { $set: { 'participantsEmails.$.status': status } }
  );
};

module.exports.updateAttendeesList = ({ sessionId, attendeesList, status }) =>
  Session.findById(sessionId).then(session => {
    const newEmails = {};
    attendeesList.forEach(item => {
      newEmails[item.email] = item.email;
    });

    session.participantsEmails.forEach(participant => {
      if (Object.keys(newEmails).includes(participant.email)) {
        // update
        // eslint-disable-next-line no-param-reassign
        session.participantsEmails.id(participant._id).status = status;
        delete newEmails[participant.email];
      } else if (participant.status === status) {
        // delete
        session.participantsEmails.id(participant._id).remove();
        delete newEmails[participant.email];
      }
    });

    Object.keys(newEmails).forEach(email => {
      session.participantsEmails.push({ email, status });
    });
    return session.save();
  });

module.exports.addSentEmail = ({
  sessionId,
  emailData,
  type,
  preServeyLink,
}) => {
  return Session.updateOne(
    { _id: sessionId },
    { $push: { sentEmails: { ...emailData, type, preServeyLink } } },
    { upsert: true }
  );
};
