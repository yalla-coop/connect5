const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const {
  getTrainerGroupSurveys,
} = require('../../../database/queries/users/loaclLead');

const User = require('../../../database/models/User');

describe('Test getTraineGroupSurveys query', () => {
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

    getTrainerGroupSurveys(lead.id).then(result => {
      expect(result).toBeDefined();
      expect(result[0].type).toBe('Pre-course');
      expect(result[0].responses).toBe(2);
      done();
    });
  });

  test('returns object with everything at 0 if no trainers stored', async done => {
    // get a user who has no group of trainers stored
    const lead = await User.findOne({ name: 'julie' });

    getTrainerGroupSurveys(lead.id).then(result => {
      expect(result).toBeDefined();
      expect(result[0].type).toBe('Pre-course');
      expect(result[0].responses).toBe(0);
      done();
    });
  });
});
