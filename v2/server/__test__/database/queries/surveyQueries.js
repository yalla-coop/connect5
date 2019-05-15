const mongoose = require('mongoose');

// load models
const Question = require('../../../database/models/Question');
const Session = require('../../../database/models/Session');
// load query
const surveyQs = require('../../../database/queries/surveys/surveyQuestions');
const storeResponse = require('../../../database/queries/surveys/storeResponse');

// build db
const buildDB = require('../../../database/data/test/index');

beforeAll(async () => {
  await buildDB();
});
afterAll(() => {
  mongoose.disconnect();
});

describe('test survey queries', () => {
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

  test('check getSurveyQs error handling', async () => {
    const surveyId = 1;
    const sessionId = '42343254353413413443545';
    await surveyQs(surveyId, sessionId).catch(err => expect(err).toBeDefined());
  });
});

describe('Tests for storing responses and answers in database', () => {
  test('storeResponse successfully stores answers and response in models', async () => {
    const surveyType = 'post-day-1';
    const singleSession = await Session.findOne({ type: '1' });
    const sessionId = singleSession._id;
    const response = await storeResponse(sessionId, surveyType, 'TEST');
    expect(response.session).toBe(sessionId);

    // const dummyAnswers = {
    //   "5bf3f05e24be507739c5fcaf": "Yes",
    //   "5bf3f05e24be507739c5fcac": [
    //     "New learning around mental health approaches (e.g. 5 ways to wellbeing, 5 areas model)",
    //     "New skills to conduct meaningful mental health related conversations",
    //   ],
    //   "5bf3f05e24be507739c5fcab": 3,
    // };

    // const storedAnswers = await storeAnswers(response._id, dummyAnswers, sessionId);

    // expect(storedAnswers).toBeDefined();
  });
});
