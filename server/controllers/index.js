const express = require("express");

const trainerController = require("./trainer");
const surveyQs = require("./getSurveyQs");

const router = express.Router();

router.use("/trainer", trainerController);

// Get data routes
router.get("/survey/:id", surveyQs.get);

router.use((err, req, res, next) => {
  res.status(500).send(`Something broke! ${err}`);
});

module.exports = router;
