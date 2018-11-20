const express = require("express");

const trainerController = require("./trainer");
const sessionController = require("./session");
const questionController = require("./question");

const router = express.Router();

router.use("/trainer", trainerController);
router.use("/session", sessionController);
router.use("/question", questionController);

module.exports = router;
