const shortid = require('shortid');
const Session = require('./../models/Session');

const createNewSession = ({
  startDate,
  session,
  inviteesNumber,
  region,
  trainers,
  emails,
}) => {
  const newSession = new Session({
    date: startDate,
    type: session,
    shortId: shortid.generate(),
    numberOfAttendees: inviteesNumber,
    region,
    trainers,
    participantsEmails: emails.map(email => ({ email, status: 'new' })),
  });
  // Add new session
  return newSession.save();
};
module.exports = createNewSession;
