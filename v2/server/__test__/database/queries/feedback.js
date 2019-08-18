const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const { feedback } = require('../../../database/queries/feedback/feedback');

const User = require('../../../database/models/User');
const Session = require('../../../database/models/Session');

describe('Test trainer feedback query', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('gets trainer feedback overall', async done => {
    const trainer = await User.find({ role: 'trainer' });
    feedback(trainer[0].id).then(result => {
      expect(result).toBeDefined();
      expect(result[0].counter[0].surveyTypes[0][0]).toBe('post-day-1');
      expect(result[0].counter[0].surveyTypes.length).toBeDefined();
      expect(result[0]).toBeDefined();
      expect(result[1]).toBeDefined();
      done();
    });
  });
  test('gets trainer feedback for individual session', async done => {
    const trainer = await User.find({ role: 'trainer' });
    const session = await Session.find({ type: 2, trainers: trainer[0] });

    feedback(trainer[0].id, session[0]._id).then(result => {
      expect(result).toBeDefined();
      expect(result[0].counter[0].surveyTypes[0][0]).toBe('post-day-2');
      expect(result[0].counter[0].surveyTypes.length).toBe(1);
      expect(result[0]).toBeDefined();
      expect(result[1]).toBeDefined();
      done();
    });
  });

  test('throws an error with invalid trainerId', async done => {
    feedback('trainerId dont exist', 'sessionId dont exist').catch(err => {
      expect(err).toBeDefined();
      done();
    });
  });

  test('throws an error with invalid sessionId', async done => {
    const trainer = await User.find({ role: 'trainer' });
    feedback(trainer[0].id, 'dont exist').catch(err => {
      expect(err).toBeDefined();
      done();
    });
  });
});
