export const surveysTypes = {
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

export const surveysHaveBehavQuestions = [
  'pre-day-1',
  'post-day-1',
  'post-day-2',
  'post-day-3',
  'pre-special',
  'post-special',
];

/**
 * an object with { "survey-name": "Survey Name" }
 */
export const readableSurveysNamePairs = {
  'pre-day-1': 'Pre-course',
  'post-day-1': 'Post Session 1',
  'post-day-2': 'Post Session 2',
  'post-day-3': 'Post Session 3',
  'pre-special': 'Pre 2-day Intensive',
  'post-special': 'Post 2-day Intensive',
  'pre-train-trainers': 'Pre train trainers',
  'post-train-trainers': 'Post train trainers',
  'follow-up-3-month': '3 month follow-up',
  'follow-up-6-month': '6 month Follow-up',
};

/**
 * an object with { "session-type" : "Session Name"}
 */
export const readableSessionNamePairs = {
  1: 'Session 1',
  2: 'Session 2',
  3: 'Session 3',
  'special-2-days': '2-day Intensive',
  'train-trainers-s1': 'Train Trainers Session 1',
  'train-trainers-s2': 'Train Trainers Session 2',
  'train-trainers-event': 'Train Trainers Day Event',
};
