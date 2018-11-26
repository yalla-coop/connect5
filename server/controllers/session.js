const express = require("express");
const GetSessionDetails = require("./get_session_details");
const GetSessionResponses = require("./get_session_responses");
const addSession = require("./add_session");


const router = express.Router();

// session router
router

  // main route
  .route("/")

  // Post to add new session
  .post(addSession);


router

  .route("/details/:sessionId/:sessionType")

  // get session details by session id and session type
  .get(GetSessionDetails);

router
  .route("/responses/:sessionId/:sessionType")
  .get(GetSessionResponses);


module.exports = router;
