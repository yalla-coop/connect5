const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const { getAllLocalLeads } = require('../../../database/queries/users/admin');

describe('Test getAllTrainers query', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('gets all localLeads', async done => {
    getAllLocalLeads().then(result => {
      expect(result).toBeDefined();
      expect(result.length).toBe(9);
      expect(result[0].name).toBe('nisha');
      done();
    });
  });
});
