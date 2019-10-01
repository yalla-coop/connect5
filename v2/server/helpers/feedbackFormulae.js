/* eslint-disable no-param-reassign */
const {
  relevantSessionsForSurveys,
  readableSessionNamePairs,
} = require('./../constants');

const categoriesPercintage = (_categories, _totalCount, _output, _key) => {
  const clonedOutput = { ..._output };
  let totalCount = 0;
  _categories.forEach(({ category, count }) => {
    if (category && category !== 'null') {
      totalCount += count;
      clonedOutput[category] = {
        ...clonedOutput[category],
        [_key]: (count / _totalCount) * 100,
      };
    }
  });
  return {
    categories: clonedOutput,
    allResponses: totalCount,
  };
};

const categoriesRaw = (_categories, _totalCount, _output, _totalResponses) => {
  const clonedOutput = { ..._output };
  let totalResponses = _totalResponses || 0;
  _categories.forEach(({ category, count }) => {
    if (category && category !== 'null') {
      totalResponses += count;
      if (clonedOutput[category]) {
        clonedOutput[category] += count;
      } else {
        clonedOutput[category] = count;
      }
    }
  });

  return {
    totalResponses,
    categoriesCount: clonedOutput,
  };
};

const feedbackFormulae = (filterdResults, average) => {
  const questions = {};
  average.forEach(({ categories, options, surveyType, text, totalCount }) => {
    const sessionType = relevantSessionsForSurveys[surveyType];

    const readableSession = readableSessionNamePairs[sessionType];
    const sessionDetails = {
      surveyType: readableSession,
      ...categoriesPercintage(categories, totalCount, {}, 'average'),
    };

    // add surveys
    if (questions[text]) {
      questions[text].surveys[readableSession] = sessionDetails;

      // update overall values
      const { totalResponses, categoriesCount } = questions[text].overall.all;

      questions[text].overall.all = categoriesRaw(
        categories,
        totalCount,
        categoriesCount,
        totalResponses
      );

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
          all: categoriesRaw(categories, totalCount, {}),

          // no filtered data yet
          filtered: {
            totalResponses: 0,
            categoriesCount: {},
          },
        },
      };
    }
  });

  filterdResults.forEach(
    ({ categories, options, surveyType, text, totalCount }) => {
      const sessionType = relevantSessionsForSurveys[surveyType];
      const readableSession = readableSessionNamePairs[sessionType];
      const { categories: output } = questions[text].surveys[readableSession];

      const sessionDetails = {
        surveyType: readableSession,
        ...categoriesPercintage(categories, totalCount, output, 'value'),
        filterdResonses: totalCount,
      };

      // add surveys
      if (questions[text]) {
        questions[text].surveys[readableSession] = sessionDetails;

        // update overall values
        const { totalResponses, categoriesCount } = questions[
          text
        ].overall.filtered;
        questions[text].overall.filtered = categoriesRaw(
          categories,
          totalCount,
          categoriesCount,
          totalResponses
        );

        // add first session
      } else {
        //  shouldn't rach here
      }
    }
  );

  // // calculate overall for average for each question
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

    const { categories } = categoriesPercintage(
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
    ).categories;

    sessionDetails.categories = categories;
    sessionDetails.filterdResonses = filtered.totalResponses;

    // delete questions[text].overall;
    questions[text].surveys.Overall = sessionDetails;
  });

  const questionArray = Object.values(questions);

  // change surveys to array
  questionArray.forEach(question => {
    const { surveys } = question;

    const surveysArray = Object.values(surveys);
    question.surveys = surveysArray;
  });

  //   /**
  //  *
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
