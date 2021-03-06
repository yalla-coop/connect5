const mongoose = require('mongoose');

const dbConnection = require('../../dbConnection');
const resetDb = require('./../resetDB');

const users = require('./users');
const sessions = require('./sessions');
const responses = require('./responses');
const questions = require('./questions');
const answers = require('./answers');
const participant = require('./participant');
const specialRequirements = require('./specialRequirements');

const buildDevelopmentData = () =>
  new Promise((resolve, reject) => {
    dbConnection()
      .then(async () => {
        // delete all documents from models
        await resetDb();
        await users();
        await participant();
        await sessions();
        await questions();
        await responses();
        await answers();
        await specialRequirements();
      })
      .then(resolve)
      .catch(reject);
  });

buildDevelopmentData().then(() => {
  // eslint-disable-next-line no-console
  console.log('Done!: Dev DB has been built successfully');
  // close the connection after build
  mongoose.disconnect();
});
