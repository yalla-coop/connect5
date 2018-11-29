// controller to get the required survey questions for this route

const surveyQs = require("../database/queries/surveyQuestions")
const createError = require("http-errors");

exports.get = (req, res) => {

  // get the dynamic id from req.params. This should be a string with the surveytype as the first number (e.g. 1). The rest of the string is the unique sessionId
  const { id } = req.params;

  // assign the surveyId and sessionId to their own variables
  const surveyId = id[0];
  const sessionId = id.substr(1);

  // initiate queries function to get the right questions from the database, the session details and then send these to the client
  surveyQs(surveyId, sessionId)
    .then(surveyDetails => {
      res.status(200).json(surveyDetails)})
    .catch(err => {
      if (err.message.indexOf('Cast to ObjectId failed') !== -1) {
        res.status(404);
        res.send((createError(404, "Data was not found")));
      } else {
        res.status(500);
        res.send((createError(500, "Server Error")));

      }
    })

};
