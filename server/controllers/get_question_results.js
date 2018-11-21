const createError = require("http-errors");
const getQuestionResultQuery = require("./../database/queries/get_question_results");

const getQuestionResults = (req, res) => {
  const { questionId, sessionId } = req.params;
  getQuestionResultQuery(questionId, sessionId)
    .then(results => res.json(results))
    .catch(() => {
      res.status(500);
      res.send((createError(500, "Server Error")));
    });
};
module.exports = getQuestionResults;
