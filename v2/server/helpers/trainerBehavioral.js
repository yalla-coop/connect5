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
  return objectForm;
};
