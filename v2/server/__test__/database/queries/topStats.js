const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const getTopStats = require('../../../database/queries/users/topStats');

const User = require('../../../database/models/User');

describe('Test topStats query', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  beforeEach(async () => {
    // build dummy data
    await buildDB();
  });

  test('top stats gets admin stats', async done => {
    getTopStats('123213', 'admin').then(result => {
      expect(result).toBeDefined();
      expect(result.participantCount).toBe(4);
      expect(result.trainerCount).toBe(20);
      done();
    });
  });

  test('top stats gets localLead stats', async done => {
    const localLead = await User.findOne({ role: 'localLead' });

    getTopStats(localLead.id, 'localLead').then(result => {
      expect(result).toBeDefined();
      expect(result.participantCount).toBe(45);
      expect(result.trainerCount).toBe(3);
      done();
    });
  });
});
