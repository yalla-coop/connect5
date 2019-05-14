// query to get the right survey questions and session details from the database and send them to the controller

// // to format the date
const moment = require('moment');

// Load models
const Question = require('../../models/Question');
const Session = require('../../models/Session');
// const User = require('../../models/User');

const surveyQs = async (surveyType, sessionId) => {
  // get the survey questions as an array of objects
  const questionsForSurvey = await Question.find({ surveyType });

  // get the session details
  const sessionDetails = await Session.findById(sessionId);

  // get the trainer details
  // const trainerDetails = await User.findById(sessionDetails.trainer);

  // put all this information into an object we can send to client
  const surveyDetails = {
    sessionDate: moment(sessionDetails.date).format('DD-MM-YYYY'),
    // trainerName: `${trainerDetails.firstName} ${trainerDetails.lastName}`,
    // trainerName: "".concat(trainerDetails.firstName, trainerDetails.lastName),
    questionsForSurvey,
    sessionId,
    // surveyId
  };

  return surveyDetails;
};

module.exports = surveyQs;
