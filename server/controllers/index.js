const express = require("express");

const trainerController = require("./trainer");
const surveyQs = require("./getSurveyQs");
const surveyAnswers = require("./surveyAnswers")

const router = express.Router();

router.use("/trainer", trainerController);

// Get data routes
router.get("/survey/:id", surveyQs.get);

// Post data routes
router.use("/submit/:responseid", surveyAnswers)

router.use((err, req, res, next) => {
  res.status(500).send(`Something broke! ${err}`);
});

module.exports = router;
