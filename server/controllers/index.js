const express = require("express");

// load controllers
const trainerController = require("./trainer");
const surveyQs = require("./getSurveyQs");
const surveyAnswers = require("./surveyAnswers")
const sessionController = require("./session");
const questionController = require("./question");
const viewSessions = require("./view-sessions");

const router = express.Router();

router.use("/trainer", trainerController);
router.use("/session", sessionController);
router.use("/question", questionController);

router.use("/view-sessions", viewSessions);

// Get data routes
router.get("/survey/:id", surveyQs.get);

// Post data routes
router.use("/submit/:responseid", surveyAnswers)

router.use((err, req, res, next) => {
  res.status(500).send(`Something broke! ${err}`);
});

module.exports = router;
