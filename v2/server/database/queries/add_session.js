const Session = require('./../models/Session');

const addSession = (sessionType, startDate, inviteesNumber, region, partner) =>
  new Promise((resolve, reject) => {
    const session = new Session({
      type: sessionType,
      date: startDate,
      numberOfAttendees: inviteesNumber,
      region,
      trainers: partner,
    });
    // Add new session
    session
      .save()
      .then(resolve(session))
      .catch(err => reject(err));
  });

module.exports = addSession;
