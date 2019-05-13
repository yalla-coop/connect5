// get array of responses IDs from answers array
const getResponsesArray = (answers) => {
  const responsesArray = [];
  answers.map((answer) => {
    const flag = responsesArray.find(response => answer.response === response);
    return !flag && responsesArray.push(answer.response);
  });
  return responsesArray;
};

export default getResponsesArray;
