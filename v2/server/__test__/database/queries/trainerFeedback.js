const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const {
  trainerFeedback,
} = require('../../../database/queries/users/trainerResults');

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
    trainerFeedback(trainer[0].id).then(result => {
      expect(result).toBeDefined();
      expect(result.length).toBeDefined();
      expect(result[0]).toBeDefined();
      expect(result[1]).toBeDefined();
      done();
    });
  });

  test('throws an error with invalid request', async done => {
    trainerFeedback('dont exist').catch(err => {
      expect(err).toBeDefined();
      done();
    });
  });
});
