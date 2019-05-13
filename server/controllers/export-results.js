const express = require("express");

const router = express.Router();
const passport = require("passport");
const createError = require("http-errors");
// finds all answers related to trainerID

const exportResults = require("../database/queries/export-results");

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  // eslint-disable-next-line camelcase
  const trainer_id = req.user._id;
  exportResults(trainer_id)
    .then((result) => {
      if (result.length === 0) {
        return res.status(204).send("No data was found");
      }
      return res.status(200).json(result);
    })
    .catch((err) => {
      if (err.message.indexOf("Cast to ObjectId failed") !== -1) {
        res.status(404);
        res.send("No data was found");
      } else {
        res.status(500);
        res.send(createError(500, "Server Error"));
      }
    });
});

module.exports = router;
