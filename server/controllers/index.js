const express = require("express");

const trainerController = require("./trainer");
const sessionController = require("./session");
const viewSessions = require("./view-sessions");

const router = express.Router();

router.use("/trainer", trainerController);
router.use("/session", sessionController);

router.use("/view-sessions", viewSessions);

module.exports = router;
