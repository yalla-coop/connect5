const dbConnection = require('../../dbConnection');
const resetDb = require('./../resetDB');

const users = require('./users');
const sessions = require('./sessions');
const responses = require('./responses');
const questions = require('./questions');
const answers = require('./answers');
const participant = require('./participant');

const buildTestData = () =>
  new Promise((resolve, reject) => {
    dbConnection()
      .then(async () => {
        // delete all documents from models
        await resetDb();
        await users();
        await sessions();
        await questions();
        await responses();
        await answers();
        await participant();
      })
      .then(resolve)
      .catch(reject);
  });

module.exports = buildTestData;
