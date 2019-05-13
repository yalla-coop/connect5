const Response = require("../models/Response");

const getSessionResponsesNumber = (sessionId, surveyType) => new Promise((resolve, reject) => {
  Response.count({ session: sessionId, surveyType })
    .then((reponsesNumber) => {
      resolve({ reponsesNumber });
    })
    .catch(reject);
});
module.exports = getSessionResponsesNumber;
