const boom = require('boom');
const surveyQs = require('../../database/queries/surveys/surveyQuestions');

module.exports = (req, res, next) => {
  // get the dynamic id from req.params. This should be a string with the surveytype as the first part. The rest of the string is the unique sessionId
  const { id } = req.params;
  const idParts = id.split('&');

  // assign the surveyId and sessionId to their own variables
  const surveyType = idParts[0];
  const sessionId = idParts[1];

  // initiate queries function to get the right questions from the database, the session details and then send these to the client
  surveyQs(surveyType, sessionId)
    .then(surveyDetails => {
      res.status(200).json(surveyDetails);
    })
    .catch(next(boom.badImplementation()));
};
