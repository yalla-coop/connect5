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
  'follow-up-6-month': '6 month follow-up',
  'follow-up-3-month-train-trainers': '3 month Train the Trainer follow-up',
  'follow-up-6-month-train-trainers': '6 month Train the Trainer follow-up',
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

export const regions = [
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

export const ages = [
  'Under 18',
  '18-24 years old',
  '25-34 years old',
  '35-44 years old',
  '45-54 years old',
  '55-64',
  'Over 64',
];

export const genders = ['Male', 'Female'];

export const ethnics = [
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

export const workforces = [
  'Emergency services (including fire service, police, ambulance)',
  'Public health specialists and practitioners (e.g. public health consultants, health improvement managers, smoking cessation advisors)',
  'Welfare (e.g. employment advisers, benefits case workers, advisers working on a voluntary basis)',
  'Community health promotion workers/volunteers (e.g. health trainers, health champions, health and wellbeing advisors, breastfeeding volunteers)',
  'Health Professionals (e.g. GPs, nurses, Allied Health Professionals)',
  'Social care and housing professionals (housing officers, social workers, youth workers and other social care professions)',
  'Teaching and educational professionals (e.g. headteachers, teachers, teaching assistants, admin staff working in education settings)',
  'Childcare related professions (e.g. nursery staff, childminders)',
  'Sports and fitness occupations (e.g. sports coaches, fitness instructors and leisure centre employees)',
  'Other (please specify)',
];
