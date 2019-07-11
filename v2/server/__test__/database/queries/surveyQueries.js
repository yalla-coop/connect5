const mongoose = require('mongoose');

// load models
const Session = require('../../../database/models/Session');
const Participant = require('../../../database/models/Participant');

// load query
const surveyQs = require('../../../database/queries/surveys/surveyQuestions');
const storeResponse = require('../../../database/queries/surveys/storeResponse');
const getAnswersFromForm = require('../../../helpers/getAnswersFromForm');

// build db
const buildDB = require('../../../database/data/test/index');

describe('Tests for storing responses and answers in database', () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  test('get survey questions for survey type', async done => {
    const surveyType = 'pre-day-1';
    const singleSession = await Session.findOne({ type: '1' });
    const { shortId } = singleSession;

    const survey = await surveyQs(surveyType, shortId);
    expect(survey).toBeDefined();
    expect(survey.questionsForSurvey[1]).toBeDefined();
    expect(survey.sessionDate).toBeDefined();
    expect(survey.trainerNames).toBeDefined();
    expect(survey.trainerNames.length).toBe(2);
    done();
  });

  test('check getSurveyQs error handling', () => {
    const surveyId = 1;
    const sessionId = '42343254353413413443545';
    surveyQs(surveyId, sessionId).catch(err => {
      expect(err).toBeDefined();
    });
  });

  test('storeResponse successfully stores answers and response in models', async done => {
    try {
      const surveyType = 'post-day-1';
      const singleSession = await Session.findOne({ type: '1' });
      const sessionId = singleSession._id;
      const PIN = 'TES22';
      const response = await storeResponse(PIN, sessionId, surveyType);
      expect(response.session).toBe(sessionId);

      const dummyAnswers = {
        '5cdc2e9546fec219392004ab': { answer: 'Under 18' },
        '5cdc2e9546fec219392004ac': { answer: 'Female' },
        '5cdc2e9546fec219392004ad': { answer: 'Other: test' },
        '5cdc2e9546fec219392004ae': { answer: 'North East' },
        '5cdc2e9546fec219392004b3': { answer: '2' },
        '5cdc2e9546fec219392004b4': { answer: '1' },
      };

      const participant = await Participant.findOne();

      const storedAnswers = getAnswersFromForm({
        responseId: response._id,
        answers: dummyAnswers,
        sessionId,
        PIN,
        participantId: participant._id,
      });

      expect(storedAnswers).toBeDefined();
      expect(storedAnswers[0].answer).toBe('Under 18');
      expect(1).toBe(1);
      done();
    } catch (error) {
      done(error);
    }
  });
});
