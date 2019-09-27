const mongoose = require('mongoose');

const buildTestData = require('../../../database/data/test');

const { removeEmailBySurveyType, scheduleNewEmail } = require('../../../database/queries/sessionDetails/scheduleEmails');

const Session = require('./../../../database/models/Session');

describe('Test 3and6month schedule emails query', () => {
  beforeAll(() => {
    // build dummy data
    return buildTestData();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('schedules a new 3 month email', async done => {
    // const trainer = await User.find({ role: 'admin' });

    const foundSession = await Session.findOne();
    const testRecipients = ["test@gmail.com", "test2@gmail.com"]
    const testDate = "10/29/2019"

    await scheduleNewEmail({ sessionId: foundSession._id, surveyType: "follow-up-3-month", recipients: testRecipients, date: testDate});

    const updatedSession = await Session.findById(foundSession._id)

    expect(updatedSession.scheduledEmails.length).toBeGreaterThan(0);
    expect(updatedSession.scheduledEmails[0].surveyType).toBe("follow-up-3-month");
    
    await removeEmailBySurveyType({ sessionId: foundSession._id, surveyType: "follow-up-3-month"})

    const updatedSession2 = await Session.findById(foundSession._id)

    expect(updatedSession2.scheduledEmails.length).toBe(0);
    done();
  });
});