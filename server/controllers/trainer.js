// What is this for?

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>trainer</h1>");
});

module.exports = router;
