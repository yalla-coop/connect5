const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("trainer reached");
  res.send("<h1>trainer</h1>");
});

module.exports = router;

