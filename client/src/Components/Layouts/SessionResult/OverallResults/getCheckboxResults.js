

const getCheckboxResults = (answers, options) => {

  // create total list of options to include potential other answers

  const totalOptions = options.map( option => option );
  const newAnswers = answers;
  const output = [];

  answers.map(answer => {
    if (!options.includes(answer)) {
      totalOptions.push(answer)
    }
    })

    totalOptions.map((option) => {
      const cummulative = answers.reduce((cumm, answer) => {
        if (answer === option) {
          return cumm + 1;
        }
        return cumm;
      }, 0);
      return output.push({ value: option, cummulative });
    });

    return { newOptions: output, newAnswers };

}

export default getCheckboxResults;