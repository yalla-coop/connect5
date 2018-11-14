const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const controllers = require('./controllers');

// DB Connection
const db = require('../config/keys').mongoURI;

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(controllers);

if (process.env.NODE_ENV === 'production') {
  // serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, resturn all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.use((req, res, next) => {
  res.status(404).send("Sorry - can't find that!");
});

app.use((err, req, res, next) => {
  res.status(500).send(`Something broke! ${err}`);
});

module.exports = app;
