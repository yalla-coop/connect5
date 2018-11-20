// to format the date
const moment = require("moment");

// Load models
const Question = require("../models/Question");
const Session = require("../models/Session");
const Trainer = require("../models/Trainer");

const surveyQs = async (surveyId, sessionId) => {

  const surveyQs = await Question.find({ surveyType: surveyId });

  const sessionDetails = await Session.findById(sessionId);

  const trainerDetails = await Trainer.findById(sessionDetails.trainer);

  const surveyDetails = {
    sessionDate: moment(sessionDetails.date).format("DD-MM-YYYY"),
    trainerName: `${trainerDetails.firstName} ${trainerDetails.lastName}`,
    // trainerName: "".concat(trainerDetails.firstName, trainerDetails.lastName),
    surveyQs,
  };

  return surveyDetails;

}

module.exports = surveyQs