const getSubQuestionResult = (columns, rows, answers) => {
  const output = {};
  rows.map((row) => {
    const columnsWithCumm = {};
    columns.map((item) => {
      columnsWithCumm[item] = 0;
    });
    output[row] = columnsWithCumm;
  });


  answers.map((inputanswer) => {
    const inputQuestions = Object.keys(inputanswer.answer);

    inputQuestions.map((inputQuestion) => {
      const inputColumn = inputanswer.answer[inputQuestion];

      output[inputQuestion][inputColumn] = output[inputQuestion][inputColumn] + 1;
    });
  });
  return output;
};

export default getSubQuestionResult;
