const Response = require("../models/Response");

const getSessionResponsesNumber = (sessionId = "5bf3101ca8d8483454ce5da1") => new Promise((resolve, reject) => {
  Response.count({ session: sessionId })
    .then(reponsesNumber => resolve({ reponsesNumber }))
    .catch(reject);
});
module.exports = getSessionResponsesNumber;
