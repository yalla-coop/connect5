const mongoose = require('mongoose');
const request = require('supertest');

const buildDB = require('../../database/data/test/index');

const app = require('../../app');

const Session = require('../../database/models/Session');
const Question = require('../../database/models/Question');

beforeAll(async () => {
  // build dummy data
  await buildDB();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Test /survey/submit/', () => {
  test('Test for answers to be submitted', async done => {
    const surveyType = 'pre-day-1';
    const singleSession = await Session.findOne({ type: '1' });
    const sessionId = singleSession._id;
    const PIN = 'TEST';

    const questionIds = await Question.find({ surveyType });

    const formState = {};

    formState[questionIds[1]._id] = 'North East';
    formState[questionIds[2]._id] = 'N15TB';
    formState[questionIds[3]._id] = 'Head of Testing';
    formState[questionIds[4]._id] =
      'Public health specialists and practitioners (e.g. public health consultants, health improvement managers, smoking cessation advisors)';
    formState[questionIds[5]._id] = 3;
    formState[questionIds[6]._id] = 4;
    formState[questionIds[7]._id] = 2;

    const dummyFormResponse = {
      PIN,
      sessionId,
      surveyType,
      formState,
    };

    request(app)
      .post('/api/survey/submit')
      .send(dummyFormResponse)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toBe(0);
        expect(res.body[0].answer).toBe(formState[questionIds[1]._id]);
        expect(res.body[0].response).toBeDefined();
        done(err);
      });
  });
});
