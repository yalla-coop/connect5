const Session = require("./../models/Session");

const editSessionQurery = (sessionType, startDate, attendeesNumber, _id) => new Promise((resolve, reject) => {
  Session.findByIdAndUpdate(_id, { type: sessionType, date: startDate, attendees: attendeesNumber })
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = editSessionQurery;
