const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/", passport.authenticate('jwt', {session: false}),
(req, res) => {
  console.log("REQUEST", req.headers)
  console.log("REACHED")
  res.send(
    // {
    // id: req.trainer.id,
    // firstName: req.trainer.firstName
    // }

    "hello"
  
  );
}
);


module.exports = router;