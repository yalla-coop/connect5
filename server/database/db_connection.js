const mongoose = require("mongoose");

require("env2")("./config/config.env");

const dbConnection = () => {
  let { mongoURI } = process.env;

  if (process.env.NODE_ENV === "test") {
    mongoURI = process.env.mongoURI_TEST;
  }

  mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
  );
};


// mongoose.connect(mongoURI);
// const dbConnection = mongoose.connection;

module.exports = dbConnection;
