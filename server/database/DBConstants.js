const { plainSurveyTypes, plainSessionsType } = require('./../constants');

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

module.exports.sessionTypes = plainSessionsType;

module.exports.surveyTypes = plainSurveyTypes;

const questionConstants = {};

questionConstants.groups = {
  DEMOGRAPHIC: { text: 'demographic', order: 1 },
  BEHAVIOURAL: { text: 'Behavioural Insights', order: 2 },
  ABOUT_YOUR_TRAINER: { text: 'about your trainer', order: 3 },
  ABOUT_YOUR_USUAL_WAY_OF_TEACHING: {
    text: 'about your usual way of teaching',
    order: 4,
  },
  ABOUT_HOW_YOU_EXPECT_TO_TEACH: {
    text: 'about how you expect to teach in the future',
    order: 5,
  },
};

questionConstants.subGroupText = {
  BEHAVIOURAL_3:
    'Thinking about having conversations in which you suggest ways a person can take action to improve mental wellbeing, please indicate your level of agreement with the following statements:',
  BEHAVIOURAL_4:
    'Thinking about conversations in which you and the person you are talking to develop a shared understanding of that person’s mental wellbeing needs, please indicate your level of agreement with the following statements:',
  BEHAVIOURAL_5:
    'Thinking about conversations that empower a person to make changes that address their mental wellbeing needs, please indicate your level of agreement with the following statements:',
  ABOUT_YOUR_TRAINER_1: 'Did your trainer ask questions...',
  ABOUT_YOUR_TRAINER_2: 'Did your trainer...',
};

questionConstants.subGroupID = {
  BEHAVIOURAL_1: `${questionConstants.groups.BEHAVIOURAL}-1`,
  BEHAVIOURAL_2: `${questionConstants.groups.BEHAVIOURAL}-2`,
  BEHAVIOURAL_3: `${questionConstants.groups.BEHAVIOURAL}-3`,
  BEHAVIOURAL_4: `${questionConstants.groups.BEHAVIOURAL}-4`,
  BEHAVIOURAL_5: `${questionConstants.groups.BEHAVIOURAL}-5`,
  ABOUT_YOUR_TRAINER_1: `${questionConstants.groups.ABOUT_YOUR_TRAINER}-1`,
  ABOUT_YOUR_TRAINER_2: `${questionConstants.groups.ABOUT_YOUR_TRAINER}-2`,
};

questionConstants.regions = [...regions, 'Other (please specify)'];

questionConstants.ages = [
  'Under 18',
  '18-24 years old',
  '25-34 years old',
  '35-44 years old',
  '45-54 years old',
  '55-64',
  'Over 64',
];

questionConstants.ethnics = [
  'English/Welsh/Scottish/Northern Irish/British',
  'Irish',
  'Gypsy or Irish Traveller',
  'White and Black Caribbean',
  'White and Black African',
  'White and Asian',
  'Indian',
  'Pakistani',
  'Bangladeshi',
  'Chinese',
  'African',
  'Caribbean',
  'Arab',
  'Other (please specify)',
];

questionConstants.questionTypes = {
  positiveNumber: {
    desc: 'numberPositive',
    min: 0,
  },
  fromZeroToTen: {
    desc: 'numberZeroTen',
    min: 0,
    max: 6,
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
  dropdown: {
    desc: 'dropdown',
  },
};

module.exports.questionConstants = questionConstants;
