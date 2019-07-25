const mongoose = require('mongoose');

const buildTestData = require('../../../database/data/test');

const { getResponseCount } = require('../../../database/queries/feedback/');

const Response = require('./../../../database/models/Response');

describe('Test exportData query', () => {
  beforeAll(() => {
    // build dummy data
    return buildTestData();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('gets trainer feedback overall', async done => {
    // const trainer = await User.find({ role: 'admin' });

    const foundResponse = await Response.findOne({ surveyType: 'pre-day-1' });

    return getResponseCount(
      foundResponse.session,
      foundResponse.surveyType
    ).then(result => {
      expect(result).toBeDefined();
      expect(result[0].session).toStrictEqual(foundResponse.session);
      done();
    });
  }, 30000);
});
