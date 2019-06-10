const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const { getAllTrainers } = require('../../../database/queries/users/admin');

describe('Test getAllTrainers query', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('gets all trainers', async done => {
    getAllTrainers().then(result => {
      expect(result).toBeDefined();
      expect(result.length).toBe(10);
      expect(result[0].name).toBeDefined();
      done();
    });
  });
});
