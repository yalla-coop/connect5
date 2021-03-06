const mongoose = require('mongoose');
const Session = require('./../../models/Session');
const Response = require('./../../models/Response');
const Answer = require('./../../models/Answer');

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
    {
      $lookup: {
        from: 'responses',
        localField: '_id',
        foreignField: 'session',
        as: 'responses',
      },
    },
  ]);
};

module.exports.deleteSession = async id => {
  // get all responses related to the session
  const responses = await Response.find({ session: id });
  const responseIds = responses.map(({ _id }) => _id);
  // delete all answers for that session
  await Answer.deleteMany({ response: { $in: responseIds } });
  // delete the session itself
  await Session.findByIdAndDelete(id);
  // delete all responses related to that session
  return Response.deleteMany({ session: id });
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

  console.log('edt', session);

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
 * @param {Object[]} data.participantsEmails - the attendees list to be updated
 * @param {Object[]} data.participantsEmails[].email - the attendee email
 * @param {Object[]} data.participantsEmails[].status - the attendee status
 * @param {Boolean} data.isPartialList - boolean value to determin if all the attendees list must updated or not
 */
const updateAttendeesList = ({
  sessionId,
  participantsEmails,
  status,
  isPartialList,
}) =>
  Session.findById(sessionId).then(async session => {
    const newEmails = {};
    participantsEmails.forEach(item => {
      newEmails[item.email] = item.email;
    });
    const deletedEmailsIds = [];

    session.participantsEmails.forEach(participant => {
      if (Object.keys(newEmails).includes(participant.email)) {
        // update
        // if the new status is "new" and the old one is "sent" so keep the "sent"
        if (
          !(
            status === 'new' &&
            session.participantsEmails.id(participant._id).status === 'sent'
          )
        ) {
          // eslint-disable-next-line no-param-reassign
          session.participantsEmails.id(participant._id).status = status;
        }
        delete newEmails[participant.email];
      } else if (
        (participant.status === status && !isPartialList) ||
        (participant.status === 'sent' && status === 'new' && !isPartialList)
      ) {
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

    // eslint-disable-next-line no-param-reassign
    session.updatedAt = new Date();
    await session.save();
  });

module.exports.updateAttendeesList = updateAttendeesList;

module.exports.addSentEmail = ({
  sessionId,
  emailData,
  type,
  preSurveyLink,
}) => {
  return Session.updateOne(
    { _id: sessionId },
    { $push: { sentEmails: { ...emailData, type } } },
    { upsert: true }
  );
};

// module.exports.update3And6MonthEmails = ({ sessionId, surveyType, date, recipients}) => {

// }
