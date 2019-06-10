const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');
const User = require('./../../../database/models/User');

const { getRegistrationDate } = require('../../../database/queries/users');

describe('Test getRegistrationDate query', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('gets the users registration date', async done => {
    const user = await User.findOne();
    getRegistrationDate(user.id).then(result => {
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
      done();
    });
  });
});
