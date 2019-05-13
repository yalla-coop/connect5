const createError = require("http-errors");
const getQuestionTypeQuery = require("../database/queries/get_question_type");

const getQuestionType = async (req, res) => {
  const { questionId } = req.params;

  getQuestionTypeQuery(questionId)
    .then(questionType => res.json(questionType))
    .catch(() => {
      res.status(500);
      res.send((createError(500, "Server Error")));
    });
};
module.exports = getQuestionType;
