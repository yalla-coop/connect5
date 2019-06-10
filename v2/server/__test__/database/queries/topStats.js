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
      expect(result.participantCount).toBe(4);
      expect(result.trainerCount).toBe(19);
      done();
    });
  });

  test('top stats gets localLead stats', async done => {
    const localLead = await User.findOne({ role: 'localLead' });

    getTopStats(localLead.id, 'localLead').then(result => {
      expect(result).toBeDefined();
      expect(result.participantCount).toBe(69);
      expect(result.trainerCount).toBe(4);
      done();
    });
  });

  test('localLead stats if they dont have trainers', async done => {
    const localLead = await User.findOne({ name: 'julie' });

    getTopStats(localLead.id, 'localLead').then(result => {
      expect(result).toBeDefined();
      expect(result.participantCount).toBe(0);
      expect(result.trainerCount).toBe(0);
      done();
    });
  });

  test('top stats gets trainer stats', async done => {
    const trainer = await User.findOne({ role: 'trainer' });

    getTopStats(trainer.id, 'trainer').then(result => {
      expect(result).toBeDefined();
      expect(result.participantCount).toBe(45);
      expect(result.responseRate).toBe(9);
      done();
    });
  });
});
