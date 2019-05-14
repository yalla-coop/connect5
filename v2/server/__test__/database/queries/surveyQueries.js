const mongoose = require('mongoose');
const dbConnection = require('../../../database/dbConnection');

// load models
const Question = require('../../../database/models/Question');
const Session = require('../../../database/models/Session');
// load query
const surveyQs = require('../../../database/queries/surveys/surveyQuestions');

// build db
const buildDB = require('../../../database/data/test/index');

describe('test survey queries', () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  test('it successfully creates the collections', async () => {
    expect(Question).toBeDefined();
  });
  test('get survey questions for survey type', async () => {
    const surveyType = 'pre-day-1';
    const singleSession = await Session.findOne({ type: '1' });
    const sessionId = singleSession._id;

    const survey = await surveyQs(surveyType, sessionId);
    expect(survey).toBeDefined();
    expect(survey.questionsForSurvey[1]).toBeDefined();
    expect(survey.sessionDate).toBeDefined();
    expect(survey.trainerNames).toBeDefined();
    expect(survey.trainerNames.length).toBe(2);
  });
});
