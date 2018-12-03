const getSubQuestionResult = (columns, rows, answers) => {
  const output = {};
  rows.forEach((row) => {
    const columnsWithCumm = {};
    columns.forEach((item) => {
      columnsWithCumm[item] = 0;
    });
    output[row] = columnsWithCumm;
  });


  answers.forEach((inputanswer) => {
    const inputQuestions = Object.keys(inputanswer.answer);

    inputQuestions.forEach((inputQuestion) => {
      const inputColumn = inputanswer.answer[inputQuestion];
      const oldValue = output[inputQuestion][inputColumn];
      output[inputQuestion][inputColumn] = oldValue + 1;
    });
  });
  return output;
};

export default getSubQuestionResult;
