// controller to send the answers to the database

const express = require("express");
const router = express.Router();

const storeResponse = require("../database/queries/storeResponse");
const storeAnswers = require("../database/queries/storeAnswers")

router.post('/', (req, res) => {
  
  const { formState, sessionId, surveyType } = req.body

  console.log("FORM STATE", formState)
  
  // storeResponse adds the response to the Response model
  // and returns the unique Response ID
  // storeAnswers adds all answers to the Answer model
  storeResponse(sessionId, surveyType)
    .then(response => storeAnswers(response._id, formState, sessionId)
    .then(res => console.log("RES", res)))
    .catch(err => console.log(err))

})

module.exports = router;