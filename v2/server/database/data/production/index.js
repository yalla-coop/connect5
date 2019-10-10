const mongoose = require('mongoose');

const dbConnection = require('../../dbConnection');
const resetDb = require('./../resetDB');

const users = require('./users');
const questions = require('./questions');

const buildProductionData = () =>
  new Promise((resolve, reject) => {
    dbConnection()
      .then(async () => {
        // delete all documents from models
        await resetDb();
        await users();
        await questions();
      })
      .then(resolve)
      .catch(reject);
  });

buildProductionData()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Done!: production DB has been built successfully');
    // close the connection after build
    mongoose.disconnect();
  })
  .catch(err => {
    console.log('err', err);
  });
