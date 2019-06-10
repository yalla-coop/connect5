const mongoose = require('mongoose');

const Answer = require('../../../database/models/Answer');
const Question = require('../../../database/models/Question');
const Response = require('../../../database/models/Response');

const buildDB = require('../../../database/data/test');

describe('Test Answer schema', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('should Answer schema be defined', async () => {
    expect(Answer).toBeDefined();
  });

  test('should Answer schema get data correctly', async done => {
    const answers = await Answer.find();

    expect(answers).toHaveLength(211);
    done();
  });

  test('should Answer schema store correctly', async done => {
    const response = await Response.findOne({ PIN: 'HIO13' });
    const question = await Question.find({ surveyType: 'pre-day-1' });

    const answer = {
      question: question[0],
      PIN: 'HIO13',
      response,
      answer: '18-24 years old',
    };

    const storedAnswer = await Answer.create(answer);

    expect(storedAnswer.PIN).toBe(answer.PIN);
    expect(storedAnswer.answer).toBe(answer.answer);
    done();
  });
});
