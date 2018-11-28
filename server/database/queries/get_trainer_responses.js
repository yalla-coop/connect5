const Response = require("../models/Response");

const getTrainerResponses = trainerId => new Promise((resolve, reject) => {
  Response.aggregate([
    {
      $match: { trainer: trainerId },
    },
    {
      $group: { _id: "$surveyType", sum: { $sum: 1 } },
    },
  ])
    .then(responses => resolve({ responses }))
    .catch(reject);
});
module.exports = getTrainerResponses;
