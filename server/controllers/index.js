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
const dashboard = require("./dashboard");
const deleteSessionById = require("./delete-sesstion");
const editSession = require("./edit_session");
const exportResults = require("./export-results");

const router = express.Router();

// PRIVATE ROUTES
router.use("/session", sessionController);
router.use("/question", questionController);
router.use("/view-sessions", viewSessions);
router.use("/dashboard", dashboard);
router.use("/deleteSession/:_id", deleteSessionById);
router.use("/edit-session/:_id", editSession);
router.use("/export-results", exportResults);

// PUBLIC ROUTES
router.use("/trainer", trainerController);
router.use("/register", registerTrainer);
router.use("/login", loginTrainer);
router.use("/submit/:responseid", surveyAnswers);
router.get("/survey/:id", surveyQs.get);

// ERROR HANDLING
router.use((err, req, res, next) => {
  res.status(500).send(`Something broke! ${err}`);
});

module.exports = router;
