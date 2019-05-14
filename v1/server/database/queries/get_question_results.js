const Answer = require("../models/Answer");

const getQuestionResults = (questionId, sessionId) => new Promise((resolve, reject) => {
  Answer.find({ question: questionId, session: sessionId })
    .then((res) => {
      resolve(res);
    })
    .catch(reject);
});
module.exports = getQuestionResults;
