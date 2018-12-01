const createError = require("http-errors");
const getRadiostarQuestionsQuery = require("./../database/queries/get_radiostar_questions");

const getRadiostarQuestions = (req, res) => {
  getRadiostarQuestionsQuery()
    .then(details => res.json(details))
    .catch(() => {
      res.status(500);
      res.send((createError(500, "Server Error")));
    });
};
module.exports = getRadiostarQuestions;
