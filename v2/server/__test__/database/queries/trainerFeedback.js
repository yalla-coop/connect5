const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const {
  trainerFeedbackOverall,
} = require('../../../database/queries/feedback/trainer');

const User = require('../../../database/models/User');

describe('Test trainer feedback query', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('gets trainer feedback', async done => {
    const trainer = await User.find({ role: 'trainer' });
    trainerFeedbackOverall(trainer[0].id).then(result => {
      expect(result).toBeDefined();
      expect(result.length).toBeDefined();
      expect(result[0]).toBeDefined();
      expect(result[1]).toBeDefined();
      done();
    });
  });

  test('throws an error with invalid request', async done => {
    trainerFeedbackOverall('dont exist').catch(err => {
      expect(err).toBeDefined();
      done();
    });
  });
});
