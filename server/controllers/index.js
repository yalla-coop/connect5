const express = require("express");

const trainerController = require("./trainer");
const surveyQs = require("./getSurveyQs");

const router = express.Router();

router.use("/trainer", trainerController);

// Get data routes
router.get("/survey/:id", surveyQs.get);

module.exports = router;
