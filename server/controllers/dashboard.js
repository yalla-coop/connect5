const express = require("express");

const router = express.Router();
const passport = require("passport");
// const jwt = require("jsonwebtoken");

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  // console.log("REQUEST", req);
  res.send({
    id: req.user.id,
    firstName: req.user.firstName,
  });
});

module.exports = router;
