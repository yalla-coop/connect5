const express = require("express");


// load controllers
const trainerController = require("./trainer");
const surveyQs = require("./getSurveyQs");
const surveyAnswers = require("./surveyAnswers");
const sessionController = require("./session");
const questionController = require("./question");
const viewSessions = require("./view-sessions");
const registerTrainer = require("./register-trainer");
const loginTrainer = require("./login-trainer");
const deleteSessionById = require("./delete-sesstion");
const getOverviewResults = require("./get_overview_results");
const getRadiostarQuestions = require("./get_radiostar_questions");

const getQuestionOverview = require("./get_question_overview");


const router = express.Router();

router.use("/trainer", trainerController);
router.use("/session", sessionController);
router.use("/question", questionController);
router.use("/view-sessions", viewSessions);
router.use("/register", registerTrainer);
router.use("/login", loginTrainer);
router.use("/deleteSession/:_id", deleteSessionById);
router.get("/trainer/overview", getOverviewResults);
router.get("/question/radiostart/all", getRadiostarQuestions);
router.use("/question/overview/results", getQuestionOverview);


// Get data routes
router.get("/survey/:id", surveyQs.get);

// Post data routes
router.use("/submit/:responseid", surveyAnswers);

router.use((err, req, res, next) => {
  res.status(500).send(`Something broke! ${err}`);
});

module.exports = router;
