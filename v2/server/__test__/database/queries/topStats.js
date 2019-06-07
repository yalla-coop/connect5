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

  test('top stats gets admin stats', async done => {
    const admin = await User.findOne({ role: 'admin' });

    getTopStats(admin.id, 'admin').then(result => {
      expect(result).toBeDefined();
      expect(result.participantCount).toBe(7);
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

  test('top stats gets trainer stats', async done => {
    const trainer = await User.findOne({ role: 'trainer' });

    getTopStats(trainer.id, 'trainer').then(result => {
      expect(result).toBeDefined();
      expect(result.participantCount).toBe(23);
      expect(result.responseRate).toBe(31);
      done();
    });
  });
});
