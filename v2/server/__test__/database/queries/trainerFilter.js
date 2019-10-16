const mongoose = require('mongoose');

const buildTestData = require('../../../database/data/test');

const { exportData } = require('../../../database/queries/feedback/exportData');

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
    return exportData({}).then(filteredResponses => {
      expect(filteredResponses).toBeDefined();
      expect(filteredResponses[0]['Survey Type']).toBeDefined();
      expect(filteredResponses[0]['Trainer 1 ID']).toBeDefined();

      // set up the trainer we're searching for in responses
      const trainerID = filteredResponses[0]['Trainer 1 ID'];

      expect(filteredResponses[0]).toBeDefined();
      expect(filteredResponses[0]['Trainer 1 ID']).toBe(trainerID);
    });
  }, 30000);
});
