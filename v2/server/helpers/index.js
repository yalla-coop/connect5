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

module.exports = {
  uppercaseSurvey,
  surveysTypes,
  getPreSurveyLink,
  getPostSurveyLink,
  getAllSurveyLinks,
  getSessionSurveys,
};
