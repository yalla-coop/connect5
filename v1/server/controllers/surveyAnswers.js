// controller to send the answers to the database

const express = require("express");

const router = express.Router();
const createError = require("http-errors");

const storeResponse = require("../database/queries/storeResponse");
const storeAnswers = require("../database/queries/storeAnswers");
const validateSurveyInput = require("../validation/survey-answers-val");

router.post("/", async (req, res) => {
  // put the req.body into a validate function
  // this function at the end returns either errors or isValid
  // if errors we send the errors back to the client
  // if valid then carry on with this code below
  console.log("SUBSMISSION", req.body);

  const { errors, isValid } = await validateSurveyInput(req.body);
  console.log("ERRORS BACK", errors);

  const { formState, sessionId, surveyType } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // storeResponse adds the response to the Response model
  // and returns the unique Response ID
  // storeAnswers adds all answers to the Answer model
  storeResponse(sessionId, surveyType)
    .then(response => storeAnswers(response._id, formState, sessionId))
    .then(result => res.status(200).json(result))
    .catch(() => {
      console.log("error reached")
      res.status(500);
      res.send(createError(500, "Error in inserting the survey response"));
    });
});

module.exports = router;
