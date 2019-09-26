const calculator = require('./formulae');

module.exports = rawData => {
  const calculatedValues = [];
  const arrayForm = [];
  rawData.forEach((rawAnswers, index) => {
    arrayForm[index] = {};
    const { answers } = rawAnswers;
    answers.forEach(object => {
      arrayForm[index][object.code] = object.answer;
    });
  });

  const PINsNumber = arrayForm.length;
  const ratio = 100 / PINsNumber;

  arrayForm.forEach(item => {
    calculatedValues.push(calculator(item));
  });

  const objectForm = {};

  calculatedValues.forEach(array => {
    array.forEach(object => {
      if (!objectForm[object.text]) {
        // create new object
        // values => [Number, Number, Number, Number, Number]
        // labels => [0-20,   21-40,  41-60  , 61-80, 81-100]
        objectForm[object.text] = [0, 0, 0, 0, 0];
      }

      if (object.formulae <= 20) {
        // [0] => 0-20
        objectForm[object.text][0] += ratio;
      } else if (object.formulae <= 40) {
        // [1] => 20-40
        objectForm[object.text][1] += ratio;
      } else if (object.formulae <= 60) {
        // [2] => 40-60
        objectForm[object.text][2] += ratio;
      } else if (object.formulae <= 80) {
        // [3] => 60-80
        objectForm[object.text][3] += ratio;
      } else {
        // [2] => 80-100
        objectForm[object.text][4] += ratio;
      }
    });
  });
  return objectForm;
};
