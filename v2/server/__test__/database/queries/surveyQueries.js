const mongoose = require('mongoose');
const dbConnection = require('../../../database/dbConnection');

// load models
const Question = require('../../../database/models/Question');

// load query
const surveyQs = require('../../../database/queries/surveys/surveyQuestions');

// build db
const buildDB = require('../../../database/data/test/index');

describe('test survey queries', () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  test('it successfully creates the collections', async () => {
    expect(Question).toBeDefined();
  });
});
