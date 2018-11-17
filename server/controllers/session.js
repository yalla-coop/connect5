const express = require("express");
const addSession = require("./add_session");

const router = express.Router();

// session router
router

  // main route
  .route("/")

  // Post to add new session
  .post(addSession);

module.exports = router;
