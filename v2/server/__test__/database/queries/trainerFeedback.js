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
    const trainer = await User.findOne({ role: 'trainer' });
    console.log(trainer._id);

    trainerFeedback(trainer.id).then(result => {
      expect(result).toBe(0);

      done();
    });
  });
});
