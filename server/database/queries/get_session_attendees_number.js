const Session = require("../models/Session");

const getSessionAttendeesNumber = (sessionId = "5bf3101ca8d8483454ce5da1") => new Promise((resolve, reject) => {
  Session.findById(sessionId, "attendees")
    .then(({ attendees }) => resolve({ attendeesNumber: attendees }))
    .catch(reject);
});
module.exports = getSessionAttendeesNumber;
