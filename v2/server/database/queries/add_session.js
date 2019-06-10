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
    numberOfAttendees: inviteesNumber,
    region,
    trainers,
    participantsEmails: emails,
  });
  // Add new session
  return newSession.save();
};
module.exports = createNewSession;
