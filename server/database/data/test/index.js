const dbConnection = require('../../dbConnection');
const resetDb = require('./../resetDB');

const users = require('./users');
const sessions = require('./sessions');
const responses = require('./responses');
const questions = require('./questions');
const answers = require('./answers');
const participant = require('./participant');
const specialRequirements = require('./specialRequirements');

const buildTestData = () =>
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

module.exports = buildTestData;
