const Session = require("./../models/Session");

const getTrainerAttendees = trainerId => new Promise((resolve, reject) => {
  Session.aggregate([
    {
      $match: { trainer: trainerId },
    },
    {
      $group: { _id: "$type", sum: { $sum: "$attendees" } }
    },
  ])
    .then(attendees => resolve({ attendees }))
    .catch(reject);
});
module.exports = getTrainerAttendees;
