const Answer = require("../models/Answer");

const getQuestionResults = sessionId => new Promise((resolve, reject) => {
  Answer.find({ session: sessionId })
    .then((answers) => {
      resolve({ answers });
    })
    .catch(reject);
});
module.exports = getQuestionResults;
