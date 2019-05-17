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

describe('Test /survey/submit/:responseid', () => {
  test('Test for answers to be submitted', async () => {
    const surveyType = 'pre-day-1';
    const singleSession = await Session.findOne({ type: '1' });
    const sessionId = singleSession._id;

    const questionIds = await Question.find({ surveyType });
    // console.log('sessionId', sessionId);
    // console.log('questionIds', questionIds);

    const formState = {};

    formState[questionIds[1]._id] = 'North East';
    formState[questionIds[2]._id] = 'N15TB';
    formState[questionIds[3]._id] = 'Head of Testing';
    formState[questionIds[4]._id] =
      'Public health specialists and practitioners (e.g. public health consultants, health improvement managers, smoking cessation advisors)';
    formState[questionIds[5]._id] = 3;
    formState[questionIds[6]._id] = 4;
    formState[questionIds[7]._id] = 2;

    // console.log('formState', formState);

    const dummyFormResponse = {
      formState,
      sessionId,
      surveyType,
    };
    // const url = `/api/survey/submit/${surveyType}${sessionId}`;
    const url = '/api/survey/submit';
    // const response = await request(app)
    request(app)
      .post(url)
      .send(dummyFormResponse)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBe('hello');
      });

    // expect(response.statusCode).toBe(200);
    // expect(response.body).toBeDefined();
    // expect(Array.isArray(response.body)).toBe(true);
    // expect(response.body[0].answer).toEqual('North East');
  });

  // test("Answers don't get stored if all required answers aren't filled in", async () => {
  //   const storedSession = await Session.findOne({ date: '2018-04-17' });

  //   const answers = {
  //     '5bfb21c72d1811f8c37796f6': 'Yorkshire and the Humber',
  //     '5bfb21c72d1811f8c3779737': 'No',
  //   };

  //   const dummyFormResponse = {
  //     formState: answers,
  //     sessionId: `${storedSession._id}`,
  //     surveyType: '1',
  //   };

  //   const response = await request(app)
  //     .post(`/submit/1${storedSession._id}`)
  //     .send(dummyFormResponse)
  //     .set('Accept', 'application/json');

  //   expect(response.statusCode).toBe(400);
  //   expect(response.body).toBeDefined();
  // });

  // test("Test answers don't get stored if responseid doesn't exist", async () => {
  //   const answers = {
  //     '5bfb21c72d1811f8c37796f6': 'Yorkshire and the Humber',
  //     '5bfb21c72d1811f8c3779737': 'No',
  //   };

  //   const dummyFormResponse = {
  //     formState: answers,
  //     sessionId: '123456',
  //     surveyType: '1',
  //   };

  //   const response = await request(app)
  //     .post('/submit/0123456')
  //     .send(dummyFormResponse)
  //     .set('Accept', 'application/json');

  //   expect(response.statusCode).toBe(400);
  // });
});
