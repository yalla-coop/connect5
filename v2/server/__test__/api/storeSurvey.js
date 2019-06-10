const mongoose = require('mongoose');
const request = require('supertest');

const buildDB = require('../../database/data/test/index');

const app = require('../../app');

const Session = require('../../database/models/Session');
const Question = require('../../database/models/Question');

describe('Test /survey/submit/', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('Test for answers to be submitted', async done => {
    const surveyType = 'pre-day-1';
    const singleSession = await Session.findOne({ type: '1' });
    const sessionId = singleSession._id;
    const PIN = 'TES22';

    const questions = await Question.find({ surveyType });
    const postcodeQuestion = await Question.findOne({
      surveyType,
      text: 'Please enter the postcode where you are active',
    });

    const formState = {};
    formState[questions[0]._id] = 'Under 18';
    formState[questions[1]._id] = 'Male';
    formState[questions[2]._id] = 'Irish';
    formState[questions[3]._id] = 'London';
    formState[questions[4]._id] = 'e50dw';
    formState[questions[5]._id] = '2019-05-23';
    formState[questions[6]._id] = 'social worker';
    formState[questions[7]._id] =
      'Emergency services (including fire service, police,ambulance)';
    formState[questions[8]._id] = '4';
    formState[questions[9]._id] = '4';
    formState[questions[10]._id] = '4';
    formState[questions[11]._id] = '4';
    formState[questions[12]._id] = '4';
    formState[questions[13]._id] = '4';
    formState[questions[14]._id] = '4';
    formState[questions[15]._id] = '4';
    formState[questions[16]._id] = '4';
    formState[questions[17]._id] = '4';
    formState[questions[18]._id] = '4';
    formState[questions[19]._id] = '4';
    formState[questions[20]._id] = '4';
    formState[questions[21]._id] = '4';
    formState[questions[22]._id] = '4';
    formState[questions[23]._id] = '4';
    formState[questions[24]._id] = '4';
    formState[questions[25]._id] = '4';
    formState[questions[26]._id] = '4';
    formState[questions[27]._id] = '4';
    formState[questions[28]._id] = '4';
    formState[questions[29]._id] = '4';
    formState[questions[30]._id] = '4';
    formState[questions[31]._id] = '4';
    formState[questions[32]._id] = '4';
    formState[questions[33]._id] = '4';
    formState[questions[34]._id] = '4';
    formState[questions[35]._id] = '4';
    formState[questions[36]._id] = '4';
    formState[questions[37]._id] = '4';
    formState[questions[38]._id] = '4';
    formState[questions[39]._id] = '4';
    formState[questions[40]._id] = '4';
    formState[questions[41]._id] = '4';
    formState[postcodeQuestion._id] = 'B33DW';

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
        expect(res.body[0].answer).toBeDefined();
        expect(res.body[0].response).toBeDefined();
        done(err);
      });
  });

  test('Answers dont get stored if not all required answers are filled in', async done => {
    const surveyType = 'pre-day-1';
    const singleSession = await Session.findOne({ type: '1' });
    const sessionId = singleSession._id;
    const PIN = 'TES22';

    const questions = await Question.find({ surveyType });

    const formState = {};

    formState[questions[0]._id] = 'Under 18';
    formState[questions[1]._id] = 'Male';
    formState[questions[2]._id] = 'Irish';

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
      .expect(400)
      .end((err, res) => {
        expect(res.body).toBeDefined();
        done(err);
      });
  });

  test('Answers dont get stored if PIN has wrong format', async done => {
    const surveyType = 'pre-day-1';
    const singleSession = await Session.findOne({ type: '1' });
    const sessionId = singleSession._id;
    const PIN = 'TEST';

    const questions = await Question.find({ surveyType });

    const formState = {};

    formState[questions[0]._id] = 'Under 18';
    formState[questions[1]._id] = 'Male';
    formState[questions[2]._id] = 'Irish';
    formState[questions[3]._id] = 'London';
    formState[questions[4]._id] = 'e50dw';
    formState[questions[5]._id] = '2019-05-23';
    formState[questions[6]._id] = 'social worker';
    formState[questions[7]._id] =
      'Emergency services (including fire service, police,ambulance)';
    formState[questions[8]._id] = '4';
    formState[questions[9]._id] = '4';
    formState[questions[10]._id] = '4';
    formState[questions[11]._id] = '4';
    formState[questions[12]._id] = '4';
    formState[questions[13]._id] = '4';
    formState[questions[14]._id] = '4';
    formState[questions[15]._id] = '4';
    formState[questions[16]._id] = '4';
    formState[questions[17]._id] = '4';
    formState[questions[18]._id] = '4';
    formState[questions[19]._id] = '4';
    formState[questions[20]._id] = '4';
    formState[questions[21]._id] = '4';
    formState[questions[22]._id] = '4';
    formState[questions[23]._id] = '4';
    formState[questions[24]._id] = '4';
    formState[questions[25]._id] = '4';
    formState[questions[26]._id] = '4';
    formState[questions[27]._id] = '4';
    formState[questions[28]._id] = '4';
    formState[questions[29]._id] = '4';
    formState[questions[30]._id] = '4';
    formState[questions[31]._id] = '4';
    formState[questions[32]._id] = '4';
    formState[questions[33]._id] = '4';
    formState[questions[34]._id] = '4';
    formState[questions[35]._id] = '4';
    formState[questions[36]._id] = '4';
    formState[questions[37]._id] = '4';
    formState[questions[38]._id] = '4';
    formState[questions[39]._id] = '4';
    formState[questions[40]._id] = '4';
    formState[questions[41]._id] = '4';

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
      .expect(400)
      .end((err, res) => {
        expect(res.body).toBeDefined();
        done(err);
      });
  });
});
