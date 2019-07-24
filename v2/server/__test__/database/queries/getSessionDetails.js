const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const {
  getSessionDetails,
} = require('../../../database/queries/sessionDetails/session');

const Session = require('../../../database/models/Session');

describe('Test sessionDetails', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('gets session with correct id', async done => {
    // get a session with address and time too
    const session = await Session.findOne({ startTime: '14:00' });

    getSessionDetails(session.id).then(result => {
      expect(result).toBeDefined();
      expect(result[0].address).toBeDefined();
      expect(result[0].startTime).toBe('14:00');
      expect(result[0].region).toBeDefined();
      expect(result[0].numberOfAttendees).toBeDefined();
      done();
    });
  });
});
