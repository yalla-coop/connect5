const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const {
  getTrainerGroupSessions,
} = require('../../../database/queries/users/loaclLead');

const User = require('../../../database/models/User');

describe('Test getTrainerGroupSessions query', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('gets trainers with correct id', async done => {
    // get a user who has a group of trainers stored
    const lead = await User.findOne({ name: 'nisha' });

    getTrainerGroupSessions(lead.id).then(result => {
      expect(result).toBeDefined();
      expect(result[0].type).toBe('Session 1');
      expect(result[0].sessions).toBe(0);
      done();
    });
  });

  test('returns object with 0 values if no trainers in group', async done => {
    // get a user who has no group of trainers stored
    const lead = await User.findOne({ name: 'julie' });

    getTrainerGroupSessions(lead.id).then(result => {
      expect(result).toBeDefined();
      expect(result[0].type).toBe('Session 1');
      expect(result[0].sessions).toBe(0);
      done();
    });
  });
});
