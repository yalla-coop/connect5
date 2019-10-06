const tokenMaxAge = {
  string: '25d',
  number: 2592000000,
};

const resetTokenMaxAge = 3600000;

const surveysTypes = {
  '1': [
    'pre-day-1',
    'post-day-1',
    '3-months-follow-up-day-1',
    '6-months-follow-up-day-1',
  ],
  '2': ['post-day-2', '3-months-follow-up-day-2', '6-months-follow-up-day-2'],
  '3': ['post-day-3', '3-months-follow-up-day-3', '6-months-follow-up-day-3'],
  'special-2-days': [
    'pre-special',
    'post-special',
    '3-months-follow-up-special-2-days',
    '6-months-follow-up-special-2-days',
  ],
  'train-trainers-s1': [
    'pre-train-trainers-s1',
    'post-train-trainers-s1',
    'follow-up-3-month-train-trainers-s1',
    'follow-up-6-month-train-trainers-s1',
  ],
  'train-trainers-s2': [
    'post-train-trainers-s2',
    'follow-up-3-month-train-trainers-s2',
    'follow-up-6-month-train-trainers-s2',
  ],
  'train-trainers-event': [
    'pre-train-trainers-event',
    'post-train-trainers-event',
    'follow-up-3-month-train-trainers-event',
    'follow-up-6-month-train-trainers-event',
  ],
};

// array of plain text of surveys names
// [ 'pre-day-1', 'post-day-1' , "post-day-2", .....]
const plainSurveyTypes = [];
Object.values(surveysTypes).forEach(surveysArray => {
  surveysArray.forEach(_survey => {
    plainSurveyTypes.push(_survey);
  });
});

// array of plain text sessions types
// [ '1', '2', '3', 'special-2-days', ...]
const plainSessionsType = Object.keys(surveysTypes);

/**
 * object with { surveyType: sessionType }
 * {
 *  "pre-day-1": "1",
 *  "post-day-1": "1",
 *  "post-day-2": "2",
 * ....
 * }
 */
const surveysSessionsPairs = {};
Object.entries(surveysTypes).forEach(([sessionType, surveysArray]) => {
  surveysArray.forEach(survey => {
    surveysSessionsPairs[survey] = sessionType;
  });
});

/**
 * an object with { "survey-name": "Survey Name" }
 */
const readableSurveysNamePairs = {
  'pre-day-1': 'Pre-course',
  'post-day-1': 'Post Session 1',
  '3-months-follow-up-day-1': '3 months Session 1 follow-up',
  '6-months-follow-up-day-1': '6 months Session 1 follow-up',

  'post-day-2': 'Post Session 2',
  '3-months-follow-up-day-2': '3 months Session 2 follow-up',
  '6-months-follow-up-day-2': '6 months Session 2 follow-up',

  'post-day-3': 'Post Session 3',
  '3-months-follow-up-day-3': '3 months Session 3 follow-up',
  '6-months-follow-up-day-3': '6 months Session 3 follow-up',

  'pre-special': 'Pre 2-day Intensive',
  'post-special': 'Post 2-day Intensive',
  '3-months-follow-up-special-2-days': '3 months special 2 days follow-up',
  '6-months-follow-up-special-2-days': '6 months special 2 days follow-up',

  'pre-train-trainers-s1': 'Pre train trainers - Session 1',
  'post-train-trainers-s1': 'Post train trainers - Session 1',
  'follow-up-3-month-train-trainers-s1':
    '3 months train trainers follow-up - Session 1',
  'follow-up-6-month-train-trainers-s1':
    '6 months train trainers follow-up - Session 1',

  'follow-up-3-month-train-trainers-s2':
    '3 months train trainers follow-up - Session 2',
  'follow-up-6-month-train-trainers-s2':
    '6 months train trainers follow-up - Session 2',

  'follow-up-3-month-train-trainers-event':
    '3 months train trainers follow-up - Event day',
  'follow-up-6-month-train-trainers-event':
    '6 months train trainers follow-up - Event day',
};

/**
 * an object with { "session-type" : "Session Name"}
 */
const readableSessionNamePairs = {
  '1': 'Session 1',
  '2': 'Session 2',
  '3': 'Session 3',
  'special-2-days': '2-day Intensive',
  'train-trainers-s1': 'Train Trainers Session 1',
  'train-trainers-s2': 'Train Trainers Session 2',
  'train-trainers-event': 'Train Trainers Day Event',
};

// object with surveys key and the related session as value
const relevantSessionsForSurveys = {};
Object.entries(surveysTypes).forEach(([session, surveysArray]) => {
  surveysArray.forEach(survey => {
    relevantSessionsForSurveys[survey] = session;
  });
});

module.exports = {
  tokenMaxAge,
  resetTokenMaxAge,
  surveysTypes,
  surveysSessionsPairs,
  plainSurveyTypes,
  plainSessionsType,
  readableSessionNamePairs,
  readableSurveysNamePairs,
  relevantSessionsForSurveys,
};
