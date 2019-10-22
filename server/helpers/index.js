const { surveysTypes } = require('./../constants');

const uppercaseSurvey = surveyType =>
  surveyType
    .split('-')
    .map(item => item[0].toLocaleUpperCase() + item.slice(1))
    .join(' ');

/**
 *  return the pre survey link
 * @param {String} sessionType - session type ["1","2","3","special-2-days"...]
 * @param {String} shortId - session shortId
 */
const getPreSurveyLink = (sessionType, shortId) => {
  const links = surveysTypes[sessionType].map(item => {
    return `${process.env.DOMAIN}/survey/${item}&${shortId}`;
  });
  return links.find(item => item.includes('pre'));
};

/**
 *  return the post survey link
 * @param {String} sessionType - session type ["1","2","3","special-2-days"...]
 * @param {String} shortId - session shortId
 */

const getPostSurveyLink = (sessionType, shortId) => {
  const links = surveysTypes[sessionType].map(item => {
    return `${process.env.DOMAIN}/survey/${item}&${shortId}`;
  });
  return links.find(item => item.includes('post'));
};

/**
 * return array of survey links post & pre if exists
 * @param {String} sessionType - session type ["1","2","3","special-2-days"...]
 * @param {String} shortId - session shortId
 */
const getAllSurveyLinks = (sessionType, shortId) => {
  return surveysTypes[sessionType].map(item => {
    return `${process.env.DOMAIN}/survey/${item}&${shortId}`;
  });
};

/**
 * return array of surveys for the session base on the type
 * @param {String} sessionType - session type ["1","2","3","special-2-days"...]
 */
const getSessionSurveys = sessionType => {
  return surveysTypes[sessionType];
};

/**
 *  take an object and the path of the target value
 *  return the nested values from deep objects
 * @param  {...any} paths - the chain of the keys to get the target value
 */
const checkAnswer = (...paths) => {
  if ((paths[0] === 0 || paths[0]) && !paths[1]) {
    // stop and return the value
    return paths[0];
  }
  if (
    paths[0] &&
    paths[1] &&
    (paths[0][paths[1]] || paths[0][paths[1]] === 0)
  ) {
    return checkAnswer(paths[0][paths[1]], ...paths.slice(2));
  }

  return undefined;
};

/**
 * calculate the average for list of numbers
 * @param {[Number]} array - array of numbers to get the average for them
 */
const calculateAverage = array => {
  const filteredNumbers = array.filter(_item => !!_item || _item === 0);
  const total = filteredNumbers.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
  return total === 0 ? 0 : total / array.length || 0;
};

const getThreeMonthSurvey = type => {
  const sessionSurveys = surveysTypes[type];
  const ThreeMonthSurvey =
    sessionSurveys &&
    sessionSurveys.find(
      survey => survey.includes('follow') && survey.includes('3')
    );

  return ThreeMonthSurvey;
};

const getSixMonthSurvey = type => {
  const sessionSurveys = surveysTypes[type];

  const SixMonthSurvey =
    sessionSurveys &&
    sessionSurveys.find(
      survey => survey.includes('follow') && survey.includes('6')
    );
  return SixMonthSurvey;
};

const getThreeMonthsFollowUpSurveyLink = (sessionType, shortId) => {
  const links = surveysTypes[sessionType].map(item => {
    return `${process.env.DOMAIN}/survey/${item}&${shortId}`;
  });
  return links.find(item => item.includes('3-months'));
};

const getSixMonthsFollowUpSurveyLink = (sessionType, shortId) => {
  const links = surveysTypes[sessionType].map(item => {
    return `${process.env.DOMAIN}/survey/${item}&${shortId}`;
  });
  return links.find(item => item.includes('6-months'));
};

module.exports = {
  uppercaseSurvey,
  surveysTypes,
  getPreSurveyLink,
  getPostSurveyLink,
  getAllSurveyLinks,
  getSessionSurveys,
  checkAnswer,
  calculateAverage,
  getThreeMonthSurvey,
  getSixMonthSurvey,
  getThreeMonthsFollowUpSurveyLink,
  getSixMonthsFollowUpSurveyLink,
};
