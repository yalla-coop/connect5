// get the answers raw object comes from front-end
// returns the participant details object from answers
const getParticipantDetails = answers => {
  const answersArr = Object.keys(answers).map(el => [el, answers[el]]);
  const participantDetails = answersArr.reduce((acc, cur) => {
    const { participantField, answer } = cur[1];
    if (participantField) {
      acc[participantField] = answer;
    }

    return acc;
  }, {});

  return participantDetails;
};

module.exports = getParticipantDetails;
