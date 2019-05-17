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
    const storedSession = await Session.findOne({ date: '2018-04-17' });

    const questionIds = await Question.find({ surveyType: 0 });

    console.log('questionIds', questionIds[0]._id);

    const answers = {};

    answers[questionIds[1]._id] = 'North East';
    answers[questionIds[2]._id] = 'N15TB';
    answers[questionIds[3]._id] = 'Head of Testing';
    answers[questionIds[4]._id] =
      'Public health specialists and practitioners (e.g. public health consultants, health improvement managers, smoking cessation advisors)';
    answers[questionIds[5]._id] = 3;
    answers[questionIds[6]._id] = 4;
    answers[questionIds[7]._id] = 2;

    // const answers = {
    //   "5bfb21c72d1811f8c37796f6": "Yorkshire and the Humber",
    //   "5bfb21c72d1811f8c3779737": "No"
    // }

    const dummyFormResponse = {
      formState: answers,
      sessionId: `${storedSession._id}`,
      surveyType: '0',
    };

    const response = await request(app)
      .post(`/submit/0${storedSession._id}`)
      .send(dummyFormResponse)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].answer).toEqual('North East');
  });

  test("Answers don't get stored if all required answers aren't filled in", async () => {
    const storedSession = await Session.findOne({ date: '2018-04-17' });

    const answers = {
      '5bfb21c72d1811f8c37796f6': 'Yorkshire and the Humber',
      '5bfb21c72d1811f8c3779737': 'No',
    };

    const dummyFormResponse = {
      formState: answers,
      sessionId: `${storedSession._id}`,
      surveyType: '1',
    };

    const response = await request(app)
      .post(`/submit/1${storedSession._id}`)
      .send(dummyFormResponse)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
  });

  test("Test answers don't get stored if responseid doesn't exist", async () => {
    const answers = {
      '5bfb21c72d1811f8c37796f6': 'Yorkshire and the Humber',
      '5bfb21c72d1811f8c3779737': 'No',
    };

    const dummyFormResponse = {
      formState: answers,
      sessionId: '123456',
      surveyType: '1',
    };

    const response = await request(app)
      .post('/submit/0123456')
      .send(dummyFormResponse)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
  });
});
