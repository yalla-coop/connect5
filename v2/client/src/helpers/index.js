export const uppercaseSurvey = surveyType =>
  surveyType
    .split('-')
    .map(item => item[0].toLocaleUpperCase() + item.slice(1))
    .join(' ');
<<<<<<< HEAD

const surveysTypes = {
  1: ['pre-day-1', 'post-day-1'],
  2: ['post-day-2'],
  3: ['post-day-3'],
  'special-2-days': ['pre-special', 'post-special'],
  'train-trainers-s1': ['pre-train-trainers-s1', 'post-train-trainers-s1'],
  'train-trainers-s2': ['post-train-trainers-s2'],
  'train-trainers-event': [
    'pre-train-trainers-event',
    'post-train-trainers-event',
  ],
};
/**
 *  return the pre survey link
 * @param {String} sessionType - session type ["1","2","3","special-2-days"...]
 * @param {String} shortId - session shortId
 */
export const getPreSurveyLink = (sessionType, shortId) => {
  const links = surveysTypes[sessionType].map(item => {
    const surveyURL = `${window.location.host}/survey/${item}&${shortId}`;
    let url = `https://${surveyURL}`;

    if (process.env.NODE_ENV === 'development') {
      url = `http://${surveyURL}`;
    }

    return url;
  });
  return links.find(item => item.includes('pre'));
};

/**
 *  return the post survey link
 * @param {String} sessionType - session type ["1","2","3","special-2-days"...]
 * @param {String} shortId - session shortId
 */

export const getPostSurveyLink = (sessionType, shortId) => {
  const links = surveysTypes[sessionType].map(item => {
    const surveyURL = `${window.location.host}/survey/${item}&${shortId}`;
    let url = `https://${surveyURL}`;

    if (process.env.NODE_ENV === 'development') {
      url = `http://${surveyURL}`;
    }

    return url;
  });
  return links.find(item => item.includes('post'));
};

/**
 * return array of survey links post & pre if exists
 * @param {String} sessionType - session type ["1","2","3","special-2-days"...]
 * @param {String} shortId - session shortId
 */
export const getAllSurveyLinks = (sessionType, shortId) => {
  return surveysTypes[sessionType].map(item => {
    const surveyURL = `${window.location.host}/survey/${item}&${shortId}`;
    let url = `https://${surveyURL}`;

    if (process.env.NODE_ENV === 'development') {
      url = `http://${surveyURL}`;
    }

    return url;
  });
};

/**
 * return array of surveys for the session base on the type
 * @param {String} sessionType - session type ["1","2","3","special-2-days"...]
 */
export const getSessionSurveys = sessionType => {
  return surveysTypes[sessionType];
};
||||||| merged common ancestors
=======

export const validPostcode = postcode => {
  postcode.replace(/\s/g, '');
  const regex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
  return regex.test(postcode);
};
>>>>>>> develop
