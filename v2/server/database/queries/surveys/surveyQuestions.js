// query to get the right survey questions and session details from the database and send them to the controller

// // to format the date
const moment = require('moment');

// Load models
const Question = require('../../models/Question');
const Session = require('../../models/Session');
const User = require('../../models/User');

const surveyQs = async (surveyType, shortId) => {
  // get the survey questions as an array of objects
  const questionsForSurvey = await Question.aggregate([
    {
      $match: { surveyType },
    },
    {
      $sort: { 'subGroup.name': 1, 'subGroup.order': -1 },
    },
  ]);

  // get the session details
  const sessionDetails = await Session.findOne({ shortId });

  // get the trainer details as an array of ids
  const { trainers, _id: sessionId } = sessionDetails;

  // get users
  const users = await User.find();

  // get trainer names
  const trainerNames = users.reduce((acc, cur) => {
    const matched = trainers.indexOf(cur._id) > -1 ? cur.name : null;
    if (matched != null) {
      acc.push(matched);
    }
    return acc;
  }, []);

  // put all this information into an object we can send to client
  const surveyDetails = {
    sessionDate: moment(sessionDetails.date).format('DD-MM-YYYY'),
    trainerNames,
    questionsForSurvey,
    sessionId,
    surveyType,
  };

  return surveyDetails;
};

module.exports = surveyQs;
