const createError = require("http-errors");
const Trainer = require("./../database/models/Trainer");
const getTrainerAttendees = require("./../database/queries/get_trainer_attendees");
const getTrainerResponses = require("./../database/queries/get_trainer_responses");

const getOverviewResults = async (req, res) => {
  const trainer = await Trainer.findOne({ email: "johndoe@gmail.com" });

  const promises = [
    getTrainerAttendees(trainer._id),
    getTrainerResponses(trainer._id),
  ];

  Promise.all(promises)
    .then(details => res.json(details))
    .catch((err) => {
      console.log(err);

      res.status(500);
      res.send((createError(500, "Server Error")));
    });
};
module.exports = getOverviewResults;
