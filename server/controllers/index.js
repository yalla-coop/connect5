const express = require("express");

const trainerController = require("./trainer");

const router = express.Router();

router.use("/trainer", trainerController);

module.exports = router;
