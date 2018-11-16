const express = require("express");

const trainerController = require("./trainer");
const sessionController = require("./session");

const router = express.Router();

router.use("/trainer", trainerController);
router.use("/session",sessionController);

module.exports = router; 