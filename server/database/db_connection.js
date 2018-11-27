const mongoose = require("mongoose");

// read "config.env" file and add it's varaible to "process.env"
if (!process.env.TRAVIS) {
  require("env2")("./config/config.env");
}

console.log("TRAVIS", process.env.TRAVIS)

const dbConnection = () => {
  // get DB url from process.env
  let { mongoURI } = process.env;

  // check if the environment is test
  if (process.env.NODE_ENV === "test") {
    // let DB url equal testing DB
    mongoURI = process.env.mongoURI_TEST;
  }

  // create DB connection
  mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
  );
};

module.exports = dbConnection;