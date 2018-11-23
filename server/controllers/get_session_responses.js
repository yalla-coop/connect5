const createError = require("http-errors");

const getSessionQuestionsQuery = require("../database/queries/get_session_questions");
const getSessionAnswersQuery = require("../database/queries/get_session_answers");

const GetSessionDetails = async (req, res) => {
  const { sessionId, sessionType } = req.params;
  const promises = [
    getSessionQuestionsQuery(sessionType),
    getSessionAnswersQuery(sessionId),
  ];
  Promise.all(promises)
    .then(details => res.json(details))
    .catch(() => {
      res.status(500);
      res.send((createError(500, "Server Error")));
    });
};

module.exports = GetSessionDetails;
