const express = require("express");

const router = express.Router();
const passport = require("passport");

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send({
    id: req.user.id,
    firstName: req.user.firstName,
  });
});

module.exports = router;
