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
  });
  // Add new session
  const createdSession = await newSession.save();
  return Session.findById(createdSession._id).populate('trainers', 'name');
};
module.exports = createNewSession;
