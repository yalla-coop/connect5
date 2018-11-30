const express = require("express");

const router = express.Router();

// finds all answers related to trainerID

const exportResults = require("../database/queries/export-results");

router.get("/", (req, res) => {
  exportResults("5c000aeb9af39342d964b698")
    .then(result => res.status(200).json(result))
    .catch(err => {
      if (err.message.indexOf('Cast to ObjectId failed') !== -1) {
        res.status(204);
        res.send("No data was found");
      } else {
        res.status(500);
        res.send((createError(500, "Server Error")));
      }
    });
});

module.exports = router;
