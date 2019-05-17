// adds all the answers from the latest survey submission
// to the Answer model

// Load model
const Answer = require('../../models/Answer');

const storeAnswers = async (responseId, answers, sessionId) => {
  // this loops through the answers object and adds each answer to the Answer model
  const answersArr = Object.keys(answers).map(el => [el, answers[el]]);
  let storableAnswers;

  answersArr.reduce((acc, cur) => {
    const answer = {
      response: responseId,
      session: sessionId,
      question: cur[0],
      answer: cur[1],
    };
    acc.push(answer);
    storableAnswers = acc;
    return storableAnswers;
  }, []);

  await Answer.create(storableAnswers);

  const storedAnswers = await Answer.find({ response: responseId });

  return storedAnswers;
};

module.exports = storeAnswers;
