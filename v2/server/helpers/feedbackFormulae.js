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

const feedbackFormulae = (filterdResults, allResults) => {
  const questions = {};
  allResults.forEach(
    ({ categories, options, sessionType, text, totalCount }) => {
      const readableSession = readableSessionNamePairs[sessionType];
      const sessionDetails = {
        sessionType: readableSession,
        categories: categoriesPercintage(
          categories,
          totalCount,
          {},
          'allResults'
        ),
        allResponses: totalCount,
      };

      // add sessions
      if (questions[text]) {
        questions[text].sessions[readableSession] = sessionDetails;

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
          sessions: {
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
    ({ categories, options, sessionType, text, totalCount }) => {
      const readableSession = readableSessionNamePairs[sessionType];

      const { categories: output, allResponses } = questions[text].sessions[
        readableSession
      ];

      const sessionDetails = {
        sessionType: readableSession,
        categories: categoriesPercintage(
          categories,
          totalCount,
          output,
          'value'
        ),
        filterdResonses: totalCount,
        allResponses,
      };

      // add sessions
      if (questions[text]) {
        questions[text].sessions[readableSession] = sessionDetails;

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

  // calculate overall for allresults for each question
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
      'allResults'
    );

    const sessionDetails = {
      sessionType: 'Overall',
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
    questions[text].sessions.Overall = sessionDetails;
  });

  return questions;
};

module.exports = feedbackFormulae;
