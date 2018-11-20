const createError = require("http-errors");
const getSessionQuestionsQuery = require("./../database/queries/get_session_questions");
const getSessionAttendeesQuery = require("./../database/queries/get_session_attendees_number");
const getSessionResponsesNumberQuery = require("./../database/queries/get_session_responses_number");


const GetSessionDetails = async (req, res) => {
  const { sessionId, sessionType } = req.params;
  console.log(req.params,"param");
  
  const promises = [
    getSessionQuestionsQuery(sessionType),
    getSessionAttendeesQuery(sessionId),
    getSessionResponsesNumberQuery(sessionId),
  ];
  Promise.all(promises)
    .then(details => res.json(details))
    .catch((err) => {
      console.log(err);
      
      res.status(500);
      res.send((createError(500, "Server Error")));
    });
};
module.exports = GetSessionDetails;
