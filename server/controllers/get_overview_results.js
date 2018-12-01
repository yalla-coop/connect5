const createError = require("http-errors");
const mongoose = require("mongoose");
const getTrainerAttendees = require("./../database/queries/get_trainer_attendees");
const getTrainerResponses = require("./../database/queries/get_trainer_responses");

const getOverviewResults = async (req, res) => {
  // get trainer id from the request
  const trainerId = req.user.id;

  // convert the Id from string into mongo ObjectId
  const trainerObjectId = mongoose.Types.ObjectId(trainerId);

  const promises = [
    getTrainerAttendees(trainerObjectId),
    getTrainerResponses(trainerObjectId),
  ];

  Promise.all(promises)
    .then(details => res.json(details))
    .catch(() => {
      res.status(500);
      res.send((createError(500, "Server Error")));
    });
};
module.exports = getOverviewResults;
