const createError = require("http-errors");
const Trainer = require("./../database/models/Trainer");
const getAllAnswers = require("./../database/queries/get_all_answers");
const checkTrainerSession = require("./../database/queries/check_trainer_session");

const getQuestionOverview = async (req, res) => {
  // select default trainer
  const trainer = await Trainer.findOne({ email: "johndoe@gmail.com" });
  console.log(req.body, "pppppppppppp");
  const { questionsIDs } = req.body;
  // just example of questions Id must come from the front end
  // const questionIDsArray = ["5bfda25a46104c1a3af514d2", "5bfda25a46104c1a3af514d3", "5bfda25a46104c1a3af514d4", "5bfda25a46104c1a3af514d5", "5bfda25a46104c1a3af514d6", "5bfda25a46104c1a3af514d7"];

  // a two dimentional array, consist of 3 arrays, each one for survey type
  const output = [[], [], [], []];

  getAllAnswers()
    .then((allAnswers) => {
      const promises = allAnswers.map(async (answer) => {
        // Check if the answer is for one of the questions array
        // eslint-disable-next-line eqeqeq
        const isAnswerInArray = questionsIDs.some(element => element == answer.question[0]._id);
        // check if the answer is belong for trainer's sessions
        const isSessionBelongTrainer = await checkTrainerSession(answer.session, trainer._id);
        if (isAnswerInArray && isSessionBelongTrainer) {
          output[answer.question[0].surveyType].push(answer.answer);
          console.log(answer.question[0].surveyType);
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
