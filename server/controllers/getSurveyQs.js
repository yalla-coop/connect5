// to format the date
const moment = require("moment");

// Load models
const Question = require("../database/models/Question");
const Session = require("../database/models/Session");
const Trainer = require("../database/models/Trainer");

exports.get = async (req, res) => {
  // get the id from req.params
  // this id should then be the id of the right survey questions
  // do a query of the mongo database to get this survey as well as the trainer and the session
  // return the results
  const { id } = req.params;

  const surveyId = id[0];
  const sessionId = id.substr(1);

  const surveyQs = await Question.find({ surveyType: surveyId });

  const sessionDetails = await Session.findById(sessionId);

  const trainerDetails = await Trainer.findById(sessionDetails.trainer);

  console.log("session details:", sessionDetails);
  console.log("trainer details:", trainerDetails);

  const surveyDetails = {
    sessionDate: moment(sessionDetails.date).format("DD-MM-YYYY"),
    trainerName: `${trainerDetails.firstName} ${trainerDetails.lastName}`,
    // trainerName: "".concat(trainerDetails.firstName, trainerDetails.lastName),
    surveyQs,
  };

  res.send(surveyDetails);
};
