/* eslint-disable no-lonely-if */
/* eslint-disable dot-notation */
const formulaeCalculator = require('./formulae');

const calculator = surveysArray => {
  const output = [];
  surveysArray.forEach((survey, index) => {
    const { survey: surveyTitle, answers } = survey;

    const formulae = formulaeCalculator(answers, surveyTitle);

    formulae.forEach(item => {
      if (output[item.text]) {
        // push to the exist one
        if (!Number.isNaN(item.formulae)) {
          const { labels, values } = output[item.text];
          output[item.text] = {
            values: [...values, item.formulae],
            labels: [...labels, item.survey],
          };
        }
      } else {
        // create new one
        if (!Number.isNaN(item.formulae)) {
          output[item.text] = {};

          output[item.text].datasets = {};
          output[item.text] = {
            values: [item.formulae],
            labels: [item.survey],
          };
        }
      }
    });
  });

  return output;
};

module.exports = rawArray => {
  // array of answers grouped by survey type
  // example
  // [
  //  {_id: 'pre-day-1', answers: [{ avg: 1, code: "example" }, ... ] },
  //  {_id: 'pre-day-2', answers: [ { avg: 2, code: "example2"}, ... ] },
  //  ...
  // ]

  const answersByCode = [];

  rawArray.forEach((survey, index) => {
    answersByCode[index] = { survey: survey._id };
    answersByCode[index].answers = {};
    survey.answers.forEach(answer => {
      answersByCode[index].answers[answer.code] = answer.avg;
    });
  });

  return calculator(answersByCode);
};
