const Session = require("../models/Session");

const getSessionAttendeesNumber = sessionId => new Promise((resolve, reject) => {
  Session.findById(sessionId, "attendees")
    .then(({ attendees }) => resolve({ attendeesNumber: attendees }))
    .catch(reject);
});
module.exports = getSessionAttendeesNumber;
