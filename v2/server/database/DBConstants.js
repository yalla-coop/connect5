/* eslint-disable no-use-before-define */
const regions = [
  'North East',
  'North West',
  'Yorkshire and the Humber',
  'East Midlands',
  'West Midlands',
  'East of England',
  'London',
  'South East',
  'South West',
];

module.exports.regions = regions;

module.exports.sessionTypes = [
  '1',
  '2',
  '3',
  'special-2-days',
  'train-trainers',
];

module.exports.surveyTypes = [
  'pre-day-1',
  'post-day-1',
  'post-day-2',
  'post-day-3',
  'post-special',
  'pre-train-trainers',
  'post-train-trainers',
  'follow-up-3-month',
  'follow-up-6-month',
];

const questionConstants = {};

questionConstants.groups = {
  DEMOGRAPHIC: 'demographic',
  BEHAVIOURAL: 'Behavioural Insights',
  ABOUT_YOUR_TRAINER: 'about your trainer',
  ABOUT_YOUR_USUAL_WAY_OF_TEACHING: 'about your usual way of teaching',
};

questionConstants.subGroupText = {
  BEHAVIOURAL_3:
    'Thinking about suggesting ways that people could take action on their own mental health and wellbeing, please indicate your agreement with the following statements:',
  BEHAVIOURAL_4:
    'Thinking about having a conversation with a person in which you develop a shared understanding of their mental health and wellbeing needs, please indicate your agreement with the following statements:',
  BEHAVIOURAL_5:
    'Thinking about using an appropriate conversational methods to empower a person to make a change that addresses their mental health and wellbeing needs, please indicate your level of agreement with the following statements:',
  ABOUT__YOUR_TRAINER_1: 'Did your trainer ask questions...',
  ABOUT_YOUR_TRAINER_2: 'Did your trainer...',
};

questionConstants.subGroupID = {
  BEHAVIOURAL_3: `${questionConstants.groups.BEHAVIOURAL}-3`,
  BEHAVIOURAL_4: `${questionConstants.groups.BEHAVIOURAL}-4`,
  BEHAVIOURAL_5: `${questionConstants.groups.BEHAVIOURAL}-5`,
  ABOUT__YOUR_TRAINER_1: `${questionConstants.groups.ABOUT_YOUR_TRAINER}-1`,
  ABOUT_YOUR_TRAINER_2: `${questionConstants.groups.ABOUT_YOUR_TRAINER}-2`,
};

questionConstants.regions = [...regions, 'Other (please specify)'];

questionConstants.questionTypes = {
  positiveNumber: {
    desc: 'number',
    min: 0,
  },
  fromZeroToTen: {
    desc: 'number',
    min: 0,
    max: 10,
  },
  radio: {
    desc: 'radio',
  },
  radioGroup: {
    desc: 'radioGroup',
    group: true,
  },
  text: {
    desc: 'text',
  },
  date: {
    desc: 'date',
  },
};

module.exports.questionConstants = questionConstants;
