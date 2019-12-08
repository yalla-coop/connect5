import { surveysTypes } from '../constants';
import {
  copyTextToClipBoard as copyText,
  splitEmailsList as splitEmails,
} from './copyTextToClipBoard';

export const uppercaseSurvey = surveyType =>
  surveyType
    .split('-')
    .map(item => item[0].toLocaleUpperCase() + item.slice(1))
    .join(' ');

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
 * create survey link using the survey type and the short id
 * @param {String} surveyType - survey type eg. pre-day-1, post-day-1,....
 * @param {Strin} shortId - the session short id
 */
export const getSurveyLink = (surveyType, shortId) => {
  const surveyURL = `${window.location.host}/survey/${surveyType}&${shortId}`;
  let url = `https://${surveyURL}`;

  if (process.env.NODE_ENV === 'development') {
    url = `http://${surveyURL}`;
  }

  return url;
};

/**
 * return array of surveys for the session base on the survey type
 * @param {String} sessionType - session type ["1","2","3","special-2-days"...]
 */
export const getSessionSurveys = sessionType => {
  return surveysTypes[sessionType];
};

export const validPostcode = postcode => {
  postcode.replace(/\s/g, '');
  const regex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
  return regex.test(postcode);
};

export const handleEnterKey = (event, cb) => {
  event.preventDefault();
  return cb(event);
};

export const copyTextToClipBoard = copyText;
export const splitEmailsList = splitEmails;
