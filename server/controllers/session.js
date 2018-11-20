const express = require("express");
const GetSessionDetails = require("./get_session_details");


const router = express.Router();

router
  .route("/details/:sessionId/:sessionType")
  .get(GetSessionDetails);
module.exports = router;
