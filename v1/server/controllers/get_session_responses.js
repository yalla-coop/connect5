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
    .catch((err) => {
      if (err.message.indexOf("Cast to ObjectId failed") !== -1) {
        res.status(404);
        res.send((createError(404, "Data was not found")))
      } else {
        res.status(500);
        res.send((createError(500, "Server Error")));
      }
    });
};

module.exports = GetSessionDetails;
