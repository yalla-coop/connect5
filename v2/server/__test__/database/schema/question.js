const mongoose = require('mongoose');

const Question = require('../../../database/models/Question');

const buildDB = require('../../../database/data/test');

describe('Test Question schema', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('should Question schema be defined', () => {
    expect(Question).toBeDefined();
  });

  test('should Question schema get data correctly', async done => {
    const questions = await Question.find();

    expect(questions).toHaveLength(319);
    done();
  });

  test('should Response schema store correctly', async done => {
    const question = {
      text: 'What is your age?',
      options: [
        'Under 18',
        '18-24 years old',
        '25-34 years old',
        '35-44 years old',
        '45-54 years old',
        '55-64',
        'Over 64',
      ],
      questionType: { desc: 'radio' },
      group: 'test group',
      surveyType: 'pre-day-1',
    };

    const storedQuestion = await Question.create(question);

    expect(storedQuestion.questionType.desc).toBe(question.questionType.desc);

    expect(storedQuestion.options).toEqual(
      expect.arrayContaining(question.options)
    );

    expect(storedQuestion.surveyType).toBe(question.surveyType);
    done();
  });
});
