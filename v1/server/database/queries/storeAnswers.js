// adds all the answers from the latest survey submission
// to the Answer model

// Load models
const Answer = require("../models/Answer")

const storeAnswers = async (responseId, answers, sessionId) => {

  // this loops through the answers object and adds each answer to the Answer model
  for (const key in answers) {
    let answer = new Answer({
      response: responseId,
      session: sessionId,
      question: key,
      answer: answers[key],
    });
  
    await answer.save();
  }
  
  const newAnswers = await Answer.find({response: responseId})

  return newAnswers;

}

module.exports = storeAnswers