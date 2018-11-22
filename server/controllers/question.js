const express = require("express");
const GetQuestionResults = require("./get_question_results");


const router = express.Router();

router
  .route("/result/:questionId/:sessionId")
  .get(GetQuestionResults);
module.exports = router;
