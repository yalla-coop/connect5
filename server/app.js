const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const controllers = require("./controllers");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(controllers);

if (process.env.NODE_ENV === "production") {
  // serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Handle React routing, resturn all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.use((req, res, next) => {
  res.status(404).send("Sorry - can't find that!");
});

app.use((err, req, res, next) => {
  res.status(500).send(`Something broke! ${err}`);
});

module.exports = app;
