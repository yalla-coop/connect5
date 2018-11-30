const express = require("express");

const router = express.Router();

// finds all answers related to trainerID

const exportResults = require("../database/queries/export-results");

router.get("/", (req, res) => {
  exportResults("5c000aeb9af39342d964b698")
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
});

module.exports = router;
