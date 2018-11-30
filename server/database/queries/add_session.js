const Session = require("./../models/Session");

const addSession = (
  trainerId,
  sessionType,
  startDate,
  attendantsNumber,
) => new Promise((resolve, reject) => {
  const session = new Session({
    trainer: trainerId,
    type: sessionType,
    date: startDate,
    invitees: 0,
    attendees: attendantsNumber,
    surveyURL1: "null",
  });
  // Add new session
  session.save()
    .then(resolve)
    .catch(err => reject(err));
});

module.exports = addSession;
