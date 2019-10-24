// get the answers raw object comes from front-end
// returns the answers in shape of storable answers
const getStorableAnswers = ({
  responseId,
  answers,
  sessionId,
  PIN,
  participantId,
}) => {
  // this loops through the answers object and adds each answer to the Answer model
  const answersArr = Object.keys(answers).map(el => [el, answers[el]]);

  const storableAnswers = answersArr.reduce((acc, cur) => {
    const { answer } = cur[1];

    const newAnswer = {
      response: responseId,
      session: sessionId,
      question: cur[0],
      answer,
      PIN,
      participant: participantId,
    };

    acc.push(newAnswer);
    return acc;
  }, []);

  return storableAnswers;
};

module.exports = getStorableAnswers;
