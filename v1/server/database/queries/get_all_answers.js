const Answer = require("./../models/Answer");

const getAllAnswers = () => new Promise(async (resolve, reject) => {
  Answer.aggregate([
    {
      $lookup: {
        from: "questions",
        localField: "question", // field in the Answer collection
        foreignField: "_id", // field in the Question collection
        as: "question",
      },
    },
  ])
    .then(resolve)
    .catch(reject);
});
module.exports = getAllAnswers;
