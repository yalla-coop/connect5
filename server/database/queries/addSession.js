const shortid = require('shortid');
const Session = require('./../models/Session');

const createNewSession = async ({
  startDate,
  session,
  inviteesNumber,
  region,
  trainers,
  emails,
  startTime,
  endTime,
  address,
  canAccessResults,
}) => {
  const newSession = new Session({
    date: startDate,
    type: session,
    shortId: shortid.generate(),
    numberOfAttendees: inviteesNumber,
    region,
    trainers,
    participantsEmails:
      emails && emails.map(email => ({ email, status: 'new' })),
    startTime,
    endTime,
    address,
    canAccessResults,
  });
  // Add new session
  const createdSession = await newSession.save();

  // schedule 3-month and 6-month follow up emails
  console.log('created', createdSession);

  return Session.findById(createdSession._id).populate('trainers', 'name');
};
module.exports = createNewSession;
