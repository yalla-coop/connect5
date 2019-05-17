// adds all the answers from the latest survey submission
// to the Answer model

// Load model
const Answer = require('../../models/Answer');

const storeAnswers = async (responseId, answers, sessionId) => {
  // this loops through the answers object and adds each answer to the Answer model
  const answersArr = Object.keys(answers).map(el => [el, answers[el]]);

  answersArr.map(async (el, i) => {
    const newAnswer = {
      response: responseId,
      session: sessionId,
      question: el[0],
      answer: el[1],
    };

    await Answer.create(newAnswer);
  });

  const newAnswers = await Answer.find({ response: responseId });

  return newAnswers;
};

module.exports = storeAnswers;
