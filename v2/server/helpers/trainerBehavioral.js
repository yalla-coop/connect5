const calculator = require('./formulae');

module.exports = rawData => {
  const calculatedValues = [];
  const arrayForm = [];
  rawData.forEach((rawAnswers, index) => {
    arrayForm[index] = { id: rawAnswers._id, answers: {} };
    const { answers } = rawAnswers;
    answers.forEach(object => {
      arrayForm[index].answers[object.code] = object.answer;
    });
  });

  arrayForm.forEach(item => {
    calculatedValues.push(calculator(item.answers, item.id.surveyType));
  });

  const objectForm = {};

  calculatedValues.forEach(array => {
    array.forEach(object => {
      if (objectForm[object.text]) {
        // push to the exist one
        if (!Number.isNaN(object.formulae)) {
          if (objectForm[object.text][object.survey]) {
            objectForm[object.text][object.survey] = [
              ...objectForm[object.text][object.survey],
              object.formulae,
            ];
          } else {
            objectForm[object.text][object.survey] = [object.formulae];
          }
        }
      } else if (!Number.isNaN(object.formulae)) {
        // create new one
        objectForm[object.text] = {};
        objectForm[object.text][object.survey] = [object.formulae];
      }
    });
  });

  // calculate the average for each survey
  Object.entries(objectForm).forEach(item => {
    const values = item[1];

    const staging = {};
    Object.entries(values).forEach(value => {
      const avg =
        value[1].reduce((accum, curr) => accum + curr, 0) / value[1].length;
      staging[value[0]] = Math.round(avg * 100) / 100;
      objectForm[item[0]] = staging;
    });
  });

  return objectForm;
};
