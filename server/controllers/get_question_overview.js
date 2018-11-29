const createError = require("http-errors");
const getAllAnswers = require("./../database/queries/get_all_answers");
const checkTrainerSession = require("./../database/queries/check_trainer_session");

const getQuestionOverview = async (req, res) => {
  // get the trainer Id from req
  const trainerId = req.user.id;
  const { questionsIDs } = req.body;

  // a two dimentional array, consist of 3 arrays, each one for survey type
  const output = [[], [], [], []];

  getAllAnswers()
    .then((allAnswers) => {
      const promises = allAnswers.map(async (answer) => {
        // Check if the answer is for one of the questions array
        const isAnswerInArray = questionsIDs
        // eslint-disable-next-line eqeqeq
        && questionsIDs.some(element => element == answer.question[0]._id);

        // check if the answer is belong for trainer's sessions
        const isSessionBelongTrainer = await checkTrainerSession(answer.session, trainerId);
        if (isAnswerInArray && isSessionBelongTrainer) {
          output[answer.question[0].surveyType].push(answer.answer);
        }
      });

      Promise.all(promises).then(() => {
        res.json(output);
      })
        .catch(() => {
          res.status(500);
          res.send((createError(500, "Server Error")));
        });
    });
};
module.exports = getQuestionOverview;
