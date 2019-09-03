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
    {
      $lookup: {
        from: 'specialrequirements',
        localField: '_id',
        foreignField: 'session',
        as: 'specialRequirements',
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

/**
 *
 * @param {Object} data - the data object
 * @param {String} data.sessionId - the id of the session to be updated
 * @param {Object[]} data.attendeesList - the attendees list to be updated
 * @param {Object[]} data.attendeesList[].email - the attendee email
 * @param {Object[]} data.attendeesList[].status - the attendee status
 * @param {Boolean} data.isPartialList - boolean value to determin if all the attendees list must updated or not
 */
const updateAttendeesList = ({
  sessionId,
  attendeesList,
  status,
  isPartialList,
}) =>
  Session.findById(sessionId).then(session => {
    const newEmails = {};
    attendeesList.forEach(item => {
      newEmails[item.email] = item.email;
    });
    const deletedEmailsIds = [];

    session.participantsEmails.forEach(participant => {
      if (Object.keys(newEmails).includes(participant.email)) {
        // update
        // eslint-disable-next-line no-param-reassign
        session.participantsEmails.id(participant._id).status = status;
        delete newEmails[participant.email];
      } else if (participant.status === status && !isPartialList) {
        // delete
        deletedEmailsIds.push(participant._id);
        delete newEmails[participant.email];
      }
    });

    deletedEmailsIds.forEach(id => {
      session.participantsEmails.id(id).remove();
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

module.exports.updateAttendeesList = updateAttendeesList;

// update the emails list without send emails
module.exports.updateInviteesList = ({
  sessionId,
  newEmailsObj,
  deletedEmails,
}) =>
  Session.findById(sessionId).then(session => {
    session.participantsEmails.forEach((participant, index) => {
      if (deletedEmails.length && deletedEmails.includes(participant.email)) {
        // eslint-disable-next-line no-param-reassign
        session.participantsEmails = session.participantsEmails.filter(
          item => item.email !== participant.email
        );
      }
    });

    if (newEmailsObj && newEmailsObj.length) {
      newEmailsObj.forEach(email => {
        session.participantsEmails.push(email);
      });
    }

    return session.save();
  });
