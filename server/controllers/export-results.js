const express = require("express");

const router = express.Router();

// finds all answers related to trainerID

const exportResults = require("../database/queries/export-results");

router.get("/", (req, res) => {
  exportResults("5bfff83395ba2c0adc517c51")
    .then(res => console.log("res=", res))
    .catch(err => console.log(err));
});

module.exports = router;
