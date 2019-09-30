/* eslint-disable no-param-reassign */
const { readableSessionNamePairs } = require('./../constants');

const categoriesPercintage = (_categories, _totalCount, _output, _key) => {
  const clonedOutput = { ..._output };
  _categories.forEach(({ category, count }) => {
    clonedOutput[category] = {
      ...clonedOutput[category],
      [_key]: (count / _totalCount) * 100,
    };
  });
  return clonedOutput;
};

const categoriesRaw = (_categories, _totalCount, _output) => {
  const clonedOutput = { ..._output };
  _categories.forEach(({ category, count }) => {
    if (clonedOutput[category]) {
      clonedOutput[category] += count;
    } else {
      clonedOutput[category] = count;
    }
  });
  return clonedOutput;
};

const feedbackFormulae = (filterdResults, average) => {
  const questions = {};
  average.forEach(
    ({ categories, options, sessionType: surveyType, text, totalCount }) => {
      const readableSession = readableSessionNamePairs[surveyType];
      const sessionDetails = {
        surveyType: readableSession,
        categories: categoriesPercintage(categories, totalCount, {}, 'average'),
        allResponses: totalCount,
      };

      // add surveys
      if (questions[text]) {
        questions[text].surveys[readableSession] = sessionDetails;

        // update overall values
        const { totalResponses, categoriesCount } = questions[text].overall.all;
        questions[text].overall.all = {
          totalResponses: totalResponses + totalCount,
          categoriesCount: categoriesRaw(
            categories,
            totalCount,
            categoriesCount
          ),
        };

        // add first session
      } else {
        questions[text] = {
          text,
          surveys: {
            Overall: {},
            [readableSession]: sessionDetails,
          },
          options,
          overall: {
            all: {
              totalResponses: totalCount,
              categoriesCount: categoriesRaw(categories, totalCount, {}),
            },
            // no filtered data yet
            filtered: {
              totalResponses: 0,
              categoriesCount: {},
            },
          },
        };
      }
    }
  );

  filterdResults.forEach(
    ({ categories, options, sessionType: surveyType, text, totalCount }) => {
      const readableSession = readableSessionNamePairs[surveyType];

      const { categories: output, allResponses } = questions[text].surveys[
        readableSession
      ];

      const sessionDetails = {
        surveyType: readableSession,
        categories: categoriesPercintage(
          categories,
          totalCount,
          output,
          'value'
        ),
        filterdResonses: totalCount,
        allResponses,
      };

      // add surveys
      if (questions[text]) {
        questions[text].surveys[readableSession] = sessionDetails;

        // update overall values
        const { totalResponses, categoriesCount } = questions[
          text
        ].overall.filtered;
        questions[text].overall.filtered = {
          totalResponses: totalResponses + totalCount,
          categoriesCount: categoriesRaw(
            categories,
            totalCount,
            categoriesCount
          ),
        };

        // add first session
      } else {
        //  shouldn't rach here
      }
    }
  );

  // calculate overall for average for each question
  Object.values(questions).forEach(({ text, overall }) => {
    const { all, filtered } = overall;
    const allCategories = Object.entries(all.categoriesCount).map(
      ([category, count]) => {
        return {
          category,
          count,
        };
      }
    );

    const categories = categoriesPercintage(
      allCategories,
      all.totalResponses,
      {},
      'average'
    );

    const sessionDetails = {
      surveyType: 'Overall',
      allResponses: all.totalResponses,
    };

    const filteredCategories = Object.entries(filtered.categoriesCount).map(
      ([category, count]) => {
        return {
          category,
          count,
        };
      }
    );

    sessionDetails.categories = categoriesPercintage(
      filteredCategories,
      filtered.totalResponses,
      categories,
      'value'
    );
    sessionDetails.categories = categories;
    sessionDetails.filterdResonses = filtered.totalResponses;

    delete questions[text].overall;
    questions[text].surveys.Overall = sessionDetails;
  });

  const questionArray = Object.values(questions);

  // change surveys to array
  questionArray.forEach(question => {
    const { surveys } = question;

    const surveysArray = Object.values(surveys);
    question.surveys = surveysArray;
  });

  questionArray.forEach(question => {
    const { surveys, options } = question;

    surveys.forEach(survey => {
      const { categories } = survey;
      options.forEach(option => {
        if (!categories[option]) {
          categories[option] = {
            value: null,
            average: null,
          };
        }
      });
      const categoriesArray = Object.entries(categories).map(([key, value]) => {
        return {
          category: key,
          ...value,
        };
      });
      survey.categories = categoriesArray;
    });
  });
  return questions;
};

module.exports = feedbackFormulae;
