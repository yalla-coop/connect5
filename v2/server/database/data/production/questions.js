const Question = require('./../../models/Question');

const { questionConstants } = require('./../../DBConstants');

// 1- Pre-course day 1
const demographics = surveyType => [
  // demographics
  {
    text: 'What is your age?',
    options: [
      'Under 18',
      '18-24 years old',
      '25-34 years old',
      '35-44 years old',
      '45-54 years old',
      '55-64',
      'Over 64',
    ],
    questionType: questionConstants.questionTypes.radio,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
  },
  {
    text: 'Gender',
    helperText: ['To which gender do you most identify?'],
    options: ['Male', 'Female'],
    questionType: questionConstants.questionTypes.radio,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
  },
  {
    text: 'Ethnicity from office of national statistics',
    helperText: [
      'What is your ethnic group?',
      'Choose one option that best describes your ethnic group or background',
    ],
    options: [
      {
        text: 'White',
        options: [
          'English/Welsh/Scottish/Northern Irish/British',
          'Irish',
          'Gypsy or Irish Traveller',
          'Any other White background, please describe',
        ],
      },
      {
        text: 'Mixed/Multiple ethnic groups',
        options: [
          'White and Black Caribbean',
          'White and Black African',
          'White and Asian',
          'Any other Mixed/Multiple ethnic background, please describe',
        ],
      },
      {
        text: 'Asian/Asian British',
        options: [
          'Indian',
          'Pakistani',
          'Bangladeshi',
          'Chinese',
          'Any other Asian background, please describe',
        ],
      },
      {
        text: 'Black/ African/Caribbean/Black British',
        options: [
          'African',
          'Caribbean',
          '16. Any other Black/African/Caribbean background, please describe',
        ],
      },
      {
        text: 'Other ethnic group',
        options: ['Arab', 'Any other ethnic group, please describe'],
      },
    ],
    questionType: questionConstants.questionTypes.radioGroup,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
  },
  {
    text: 'Please select your region:',
    options: questionConstants.regions,
    questionType: questionConstants.questionTypes.radio,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
  },
  {
    text: 'Please enter the first date of your Connect 5 training session 1',
    questionType: questionConstants.questionTypes.date,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
  },
  {
    text: 'Please enter your job title',
    questionType: questionConstants.questionTypes.text,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
  },
  {
    text: 'Please select your workforce',
    questionType: questionConstants.questionTypes.radio,
    options: [
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
    ],
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
  },
];

const behavioural1 = surveyType => [
  {
    code: 'People',
    group: questionConstants.groups.BEHAVIOURAL,
    surveyType,
    text:
      'How many people have you seen in the last week who could have benefited from some improvement in their mental health and wellbeing?',
    questionType: questionConstants.questionTypes.positiveNumber,
  },
  {
    code: 'B1',
    group: questionConstants.groups.BEHAVIOURAL,
    surveyType,
    text:
      'In how many of those people did you: Suggest ways they could take action on their own mental health or wellbeing?',
    questionType: questionConstants.questionTypes.positiveNumber,
  },
  {
    code: 'B2',
    group: questionConstants.groups.BEHAVIOURAL,
    surveyType,
    text:
      'In how many of those people did you: have a conversation in which you developed a shared understanding of their mental health and wellbeing needs?',
    questionType: questionConstants.questionTypes.positiveNumber,
  },
  {
    code: 'B3',
    group: questionConstants.groups.BEHAVIOURAL,
    surveyType,
    questionType: questionConstants.questionTypes.positiveNumber,
    text:
      'In how many of those people did you: use appropriate conversational methods to empower them to make a change that addresses their mental health and wellbeing needs?',
  },
];

const behavioural2 = surveyType => [
  {
    code: 'BE1',
    group: questionConstants.groups.BEHAVIOURAL,
    surveyType,
    text:
      'For 10 patients you saw who could benefit from some improvement in their mental health and wellbeing in how many would you expect to: Suggest ways they could take action on their own mental health or wellbeing ',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'BE2',
    group: questionConstants.groups.BEHAVIOURAL,
    surveyType,
    text:
      'For 10 patients you saw who could benefit from some improvement in their mental health and wellbeing in how many would you expect to: Have a conversation in which you develop a shared understanding of their mental health and wellbeing needs?',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'BE3',
    group: questionConstants.groups.BEHAVIOURAL,
    surveyType,
    text:
      'For 10 patients you saw who could benefit from some improvement in their mental health and wellbeing in how many would you expect to: use appropriate conversational methods to empower them to make a change that addresses their mental health and wellbeing?',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
];

const behavioural3 = surveyType => [
  {
    code: 'KnowB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      text: questionConstants.subGroupText.BEHAVIOURAL_3,
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
      order: 1,
    },
    surveyType,
    text:
      'I have the knowledge to suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SkillB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'I have the skills to suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'HabitB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'I am in the habit of suggesting ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'OutEB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'If I suggest ways that people could take action on their own mental health or wellbeing they are likely to have better mental health in the future',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'ConfB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'I am confident that I can suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE1B1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'People I work WITH think that I should suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE2B1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'People I work FOR think that I should suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'TimeB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'I have the time to spend suggesting ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'RoleB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'It is part of my role to suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
];

const behavioural4 = surveyType => [
  {
    code: 'KnowB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      text: questionConstants.subGroupText.BEHAVIOURAL_4,
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
      order: 2,
    },
    surveyType,
    text:
      'I have the knowledge to have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SkillB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'I have the skills to have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'HabitB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'I am in the habit of having a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'OutEB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'If I have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs they are likely to have better mental health in the future',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'ConfB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'I am confident that I can have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE1B1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'People I work WITH think that I should have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE2B1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'People I work FOR think that I should have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'TimeB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'I have the time to spend having a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'RoleB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'It is part of my role to have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
];

const behavioural5 = surveyType => [
  {
    code: 'KnowB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      text: questionConstants.subGroupText.BEHAVIOURAL_5,
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
      order: 3,
    },
    surveyType,
    text:
      'I have the knowledge to use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SkillB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'I have the skills to use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'HabitB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'I am in the habit of using an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'OutEB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'If I use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs, they are likely to have better mental health in the future',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'ConfB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'I am confident that I can use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE1B1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'People I work WITH think that I should use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE2B1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'People I work FOR think that I should use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'TimeB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'I have the time to spend to use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'RoleB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'It is part of my role to use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
];

const yourTrainer1 = surveyType => [
  {
    code: 'Trainquest1',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      text: questionConstants.subGroupText.ABOUT__YOUR_TRAINER_1,
      subGroupID: questionConstants.subGroupID.ABOUT__YOUR_TRAINER_1,
      order: 1,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: '… in a way that included as many of the learners as possible?',
  },
  {
    code: 'Trainquest2',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT__YOUR_TRAINER_1,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      '… about how you or other learners are learning (for example ‘how do you know that?’ Or ‘can you explain how you came to that answer?’)',
  },
  {
    code: 'Trainquest3',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT__YOUR_TRAINER_1,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: '… that are open ended, challenging, searching or probing?',
  },
  {
    code: 'Trainquest4',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT__YOUR_TRAINER_1,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: '… that required you or other learners to apply your knowledge?',
  },
  {
    code: 'Trainquest5',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT__YOUR_TRAINER_1,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      '… about how what you are currently learning relates to what you knew before?',
  },
];

const yourTrainer2 = surveyType => [
  {
    code: 'TrainAtt1',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      text: questionConstants.subGroupText.ABOUT_YOUR_TRAINER_2,
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      order: 2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Listen to you and other learners?',
  },
  {
    code: 'TrainAtt2',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Respond positively to being asked questions?',
  },
  {
    code: 'TrainAtt3',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Celebrate learner contributions and successes?',
  },
  {
    code: 'TrainAtt4',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Demonstrate an interest in the topic and in the activities of the learners?',
  },
  {
    code: 'TrainAtt5',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Use language to praise, support and show positive regard to you and other learners?',
  },
  {
    code: 'TrainAtt6',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Demonstrate their own lack of understanding either current or previous?',
  },
  {
    code: 'TrainAtt7',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Use derogatory or humiliating language?',
  },
  {
    code: 'TrainAtt8',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Make eye contact with multiple learners?',
  },
  {
    code: 'TrainAtt9',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Speak with an enthusiastic tone?',
  },
  {
    code: 'TrainAtt10',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Use verbal and non-verbal communication that indicated they were listening to  you or other learners?',
  },
  {
    code: 'TrainAtt11',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Use words to encourage you or other learners?',
  },
  {
    code: 'TrainAtt12',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Use the names of the learners?',
  },
  {
    code: 'TrainAtt13',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Demonstrate their own curiosity and interest in the topic?',
  },
  {
    code: 'SessionOverall1',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Was the session what you expected?',
  },
  {
    code: 'SessionOverall2',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      "was the session at a good pace for you (did you feel you had enough time but that the time didn't drag)?",
  },
  {
    code: 'SessionOverall3',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Did you enjoy the session?',
  },
];

const yourTeachingWay = surveyType => [
  {
    code: 'TTHabitAtt1',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'When I teach, I am in the habit of listening to the learners',
  },
  {
    code: 'TTHabitAtt2',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of responding positively to being asked questions',
  },
  {
    code: 'TTHabitAtt3',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of celebrating learner contributions and successes',
  },
  {
    code: 'TTHabitAtt4',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of using language to praise, support and show positive regard to learners',
  },
  {
    code: 'TTHabitAtt5',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of deliberately demonstrating my own lack of understanding (either current or previous)',
  },
  {
    code: 'TTHabitAtt6',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of speaking with an enthusiastic tone',
  },
  {
    code: 'TTHabitAtt7',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of making eye contact with multiple learners',
  },
  {
    code: 'TTHabitAtt8',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach I am in the habit of using verbal and non-verbal communication to indicate that I am listening to the learners',
  },
  {
    code: 'TTHabitAtt9',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of using words to encourage the learners',
  },
  {
    code: 'TTHabitAtt10',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'When I teach, I am in the habit of using the names of the learners',
  },
  {
    code: 'TTHabitAtt11',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of demonstrating my own curiosity and interest in the topic',
  },
  {
    code: 'TTCapability1',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am conscious of trying to develop what the learners know and / or know how to do (their capabilities)',
  },
  {
    code: 'TTOpportunity1',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am conscious of trying to help the learners think about how they might put their learning into practice when they go back to work',
  },
  {
    code: 'TTMotivation1',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      "When I teach, I am conscious of trying to increase the learners' motivation for putting their learning into practice when they go back to work",
  },
  {
    code: 'TTOpportunity2',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I ask the learners about any barriers they might have when they try to put their learning into practice when they go back to work',
  },
  {
    code: 'TTOpportunity3',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I ask the learners to think about how the people they work with might respond if they try to put their learning into practice when they go back to work',
  },
];

module.exports = () => {
  const preCourseDay1Questions = [
    ...demographics('pre-day-1'),
    ...behavioural1('pre-day-1'),
    ...behavioural2('pre-day-1'),
    ...behavioural3('pre-day-1'),
    ...behavioural4('pre-day-1'),
    ...behavioural5('pre-day-1'),
  ];

  const postCourseDay1Questions = [
    ...behavioural2('post-day-1'),
    ...behavioural3('post-day-1'),
    ...yourTrainer1('post-day-1'),
    ...yourTrainer2('post-day-1'),
  ];

  const postCourseDay2Questions = [
    ...behavioural2('post-day-2'),
    ...behavioural3('post-day-2'),
    ...behavioural4('post-day-2'),
    ...yourTrainer1('post-day-2'),
    ...yourTrainer2('post-day-2'),
  ];

  const postCourseDay3Questions = [
    ...behavioural2('post-day-3'),
    ...behavioural3('post-day-3'),
    ...behavioural4('post-day-3'),
    ...behavioural5('post-day-3'),
  ];

  const postSpecial2DaysQuestions = [
    ...behavioural2('post-special'),
    ...behavioural3('post-special'),
    ...behavioural4('post-special'),
    ...behavioural5('post-special'),
  ];

  const preTrainTheTrainerQuestions = [
    ...yourTeachingWay('pre-train-trainers'),
  ];

  const postTrainTheTrainerQuestions = [
    ...yourTeachingWay('post-train-trainers'),
  ];

  const followUp3MonthsQuestions = [
    ...behavioural1('follow-up-3-month'),
    ...behavioural2('follow-up-3-month'),
    ...behavioural3('follow-up-3-month'),
    ...behavioural4('follow-up-3-month'),
    ...behavioural5('follow-up-3-month'),
  ];

  const followUp6MonthsQuestions = [
    ...behavioural1('follow-up-6-month'),
    ...behavioural2('follow-up-6-month'),
    ...behavioural3('follow-up-6-month'),
    ...behavioural4('follow-up-6-month'),
    ...behavioural5('follow-up-6-month'),
  ];

  return Question.create([
    ...preCourseDay1Questions,
    ...postCourseDay1Questions,
    ...postCourseDay2Questions,
    ...postCourseDay3Questions,
    ...postSpecial2DaysQuestions,
    ...preTrainTheTrainerQuestions,
    ...postTrainTheTrainerQuestions,
    ...followUp3MonthsQuestions,
    ...followUp6MonthsQuestions,
  ]);
};
