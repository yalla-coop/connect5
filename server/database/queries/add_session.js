const Session = require("./../models/Session");

const addSession = (
  trainerId,
  sessionType,
  startDate,
  inviteesNumber,
) => new Promise((resolve, reject) => {  
  const session = new Session({
    trainer: trainerId,
    type: sessionType,
    date: startDate,
    invitees: inviteesNumber,
    attendees: 0,
    surveyURL1: "null",
  });
  // Add new session
  session.save()
    .then(resolve)
    .catch(err => reject(err));
});

module.exports = addSession;
