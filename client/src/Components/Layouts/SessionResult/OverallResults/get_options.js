const getOptions = (answers, options, isReversed) => {
  const output = [];
  const newAnswers = [];

  answers.map(answer => {
    if (!options.includes(answer.answer)) {
      options.push(answer.answer)
    }
    return options;
    })

  options.map((option) => {
    const cummulative = answers.reduce((cumm, answer) => {
      if (answer.answer === option) {
        return cumm + 1;
      }
      return cumm;
    }, 0);
    return output.push({ value: option, cummulative });
  });

  answers.map((answer) => {
    let flag = false;
    options.map((option) => {
      if (answer.answer === option) {
        flag = true;
      }
      return flag;
    });
    return !flag && newAnswers.push(answer.answer);
  });

  return (isReversed ? { options: output.reverse(), newAnswers } : { options: output, newAnswers });
};

export default getOptions;
