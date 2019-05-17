// adds all the answers from the latest survey submission
// to the Answer model

// Load models
const Answer = require('../../models/Answer');

const storeAnswers = async (responseId, answers, sessionId, PIN) => {
  // this loops through the answers object and adds each answer to the Answer model
  const answersArr = Object.keys(answers);
  // answersArr.map(singleAnswer => {
  //   console.log('hello');
  //   // const newAnswer = {
  //   //   response: responseId,
  //   //   session: sessionId,
  //   //   question: key,
  //   //   answer: answers[key],
  //   // };
  // });

  for (const key in answers) {
    const answer = new Answer({
      PIN,
      response: responseId,
      session: sessionId,
      question: key,
      answer: answers[key],
    });

    await answer.save();
  }

  const newAnswers = await Answer.find({ response: responseId });

  return newAnswers;
};

module.exports = storeAnswers;
