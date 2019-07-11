const mongoose = require('mongoose');

const buildTestData = require('../../../database/data/test');

const exportData = require('../../../database/queries/feedback/exportData');

describe('Test exportData query', () => {
  beforeAll(() => {
    // build dummy data
    return buildTestData();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('gets trainer feedback overall', () => {
    // const trainer = await User.find({ role: 'admin' });
    return exportData('admin').then(result => {
      expect(result).toBeDefined();
      expect(result[0]['Survey Type']).toBeDefined();
      expect(result[0]['Session Date']).toBeDefined();
      expect(result[0]['Session Region']).toBeDefined();
      expect(result[0]['Trainer 1 Name']).toBeDefined();
    });
  }, 30000);
});
