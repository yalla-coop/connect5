const mongoose = require('mongoose');

// read the config file
require('dotenv').config();

let mongoURI = process.env.MONGO_URI;
if (process.env.NODE_ENV === 'test') {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGOURI_TEST;
  console.log('0000000000', mongoURI);
} else if (process.env.NODE_ENV !== 'production') {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGOURI_DEV;
  console.log('0000000000', mongoURI);
}

// create DB connection
const dbConnection = () =>
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });

module.exports = dbConnection;
