const joinQuestionsWithAnwsers = (questions, answers) => {
  const output = [];

  answers.map((answer) => {
    const mathcedquestion = questions.filter(question => question._id === answer.question);
    const item = answer;
    // eslint-disable-next-line no-unused-expressions
    mathcedquestion[0] && (item.questionText = mathcedquestion[0].questionText)
    && (item.inputType = mathcedquestion[0].inputType);
    return mathcedquestion[0] && output.push(item);
  });
  // slice the first 5 questions from question array
  return output.slice(5 - output.length);
};

export default joinQuestionsWithAnwsers;
