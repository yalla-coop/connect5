const mongoose = require('mongoose');

const buildTestData = require('../../../database/data/test');

const exportData = require('../../../database/queries/feedback/exportData');

describe('Test exportData query', () => {
  beforeAll(async done => {
    // build dummy data
    await buildTestData();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('gets trainer feedback overall', async done => {
    // const trainer = await User.find({ role: 'admin' });
    exportData('admin')
      .then(result => {
        expect(result).toBeDefined();
        expect(result[0]['Survey Type']).toBeDefined();
        expect(result[0]['Session Date']).toBeDefined();
        expect(result[0]['Session Region']).toBeDefined();
        expect(result[0]['Trainer 1 Name']).toBeDefined();
        done();
      })
      .catch(err => done(err));
  });
});
