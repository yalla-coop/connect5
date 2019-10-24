const mongoose = require('mongoose');

// read the config file
require('dotenv').config();

let mongoURI = process.env.MONGO_URI;
if (process.env.NODE_ENV === 'test') {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGOURI_TEST;
} else if (process.env.NODE_ENV !== 'production') {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGOURI_DEV;
}
// mongodb://localhost:27017/connect5db
// create DB connection
const dbConnection = () =>
  mongoose.disconnect().then(() =>
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
  );

module.exports = dbConnection;
