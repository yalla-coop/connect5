// query to get the right survey questions and session details from the database and send them to the controller

// to format the date
const moment = require("moment");

// Load models
const Question = require("../models/Question");
const Session = require("../models/Session");
const Trainer = require("../models/Trainer");

const surveyQs = async (surveyId, sessionId) => {

  // get the survey questions
  const surveyQs = await Question.find({ surveyType: surveyId });

  // get the session details
  const sessionDetails = await Session.findById(sessionId);

  // get the trainer details
  const trainerDetails = await Trainer.findById(sessionDetails.trainer);

  // put all this information into an object we can send to client
  const surveyDetails = {
    sessionDate: moment(sessionDetails.date).format("DD-MM-YYYY"),
    trainerName: `${trainerDetails.firstName} ${trainerDetails.lastName}`,
    // trainerName: "".concat(trainerDetails.firstName, trainerDetails.lastName),
    surveyQs,
    sessionId,
    surveyId
  };

  return surveyDetails;

}

module.exports = surveyQs