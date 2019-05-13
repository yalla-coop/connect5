const express = require("express");

const router = express.Router();
const loginTrainer = require("../database/queries/login-trainer");
// Load Input Validation File
const validateLoginInput = require("../validation/login-trainer-val");

router.post("/", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  loginTrainer(email, password, errors)
    .then((token) => {
      res.status(200).json(token);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
