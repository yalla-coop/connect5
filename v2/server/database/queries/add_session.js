const Session = require('./../models/Session');

const createNewSession = ({
  startDate,
  session,
  inviteesNumber,
  region,
  partnerTrainer1,
  partnerTrainer2,
  emails,
}) => {
  const newSession = new Session({
    date: startDate,
    type: session,
    numberOfAttendees: inviteesNumber,
    region,
    trainers: [partnerTrainer1, partnerTrainer2],
    participantsEmails: emails,
  });
  // Add new session
  return newSession.save();
};
module.exports = createNewSession;
