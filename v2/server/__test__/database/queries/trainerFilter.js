const mongoose = require('mongoose');

const buildTestData = require('../../../database/data/test');

const {
  trainerFilter,
  exportData,
} = require('../../../database/queries/feedback/exportData');

const User = require('./../../../database/models/User');

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
    return exportData('admin').then(result => {
      expect(result).toBeDefined();
      expect(result[0]['Survey Type']).toBeDefined();
      expect(result[0]['Trainer 1 ID']).toBeDefined();

      // set up the trainer we're searching for in responses
      const trainerID = result[0]['Trainer 1 ID'];

      const filteredResponses = trainerFilter(result, [trainerID]);

      expect(filteredResponses[0]).toBeDefined();
      expect(filteredResponses[0]['Trainer 1 ID']).toBe(trainerID);
    });
  }, 30000);
});
