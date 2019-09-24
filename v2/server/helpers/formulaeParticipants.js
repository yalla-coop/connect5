const { readableSurveysNamePairs } = require('../constants');

/** ------------------------input shape--------------------------
 * input shape
 * userAnswers
 * {
      '<survey-type>': {
        '<code>': {
          answer: Number, // the answer value, Null for not answered questions
        },
      },
    };

  * allAnswers
    [
      {
        '<survey-type>': {
          '<code>': {
            answer: Number, // the answer value, Null for not answered questions
          },
        },
      };
    ]

    Example
    {
      'pre-day-1': {
        KnowB1: {
          answer: 2,
          average: 4,
        },
      },
      ...
    };
 *
 */

/** ------------------------output shape--------------------------
 * 
 * {
  // for `Your behaviour is influenced ...` section:
  categorized: [
    {
      text: String, //  the text to be displayed above each chart
      surveys: [
        {
          surveyType: String, // survey type to be displayed beside each chart eg. "Pre-Course Survey"
          categories: [
            {
              category: String, // one of: "Capability", "Opportunity", "Motivation"
              value: Number, // the calculated value for each category [ 0 - 100 ] || null when no data collected
              average: Number, // the average for all calculated values in the app
            },
          ],
        },
      ],
    },
  ],
  //  for "in last week" section:
  nonCategorized: [
    {
      text: String, //  the text to be displayed above each chart
      surveys: [
        {
          surveyType: String, // survey type to be displayed beside each chart eg. "Pre-Course Survey"
          value: Number, // the calculated value for each category [ 0 - 100 ] || null when no data collected
          average: Number, // the average for all calculated values in the app
        },
      ],
    },
  ],
}
 */

const checkAnswer = (...paths) => {
  if (paths[0] && !paths[1]) {
    // stop and return the value
    return paths[0];
  }
  if (paths[0][paths[1]]) {
    return checkAnswer(paths[0][paths[1]], ...paths.slice(2));
  }

  return undefined;
};

const output = {
  FeedbackUserCapabilityB1: survey => {
    // (KnowB1+SkillB1)*5
    return (
      (checkAnswer(survey, 'KnowB1', 'answer') +
        checkAnswer(survey, 'SkillB1', 'answer')) *
        5 || null
    );
  },
  FeedbackUserOpportunityB1: survey => {
    // [(SocE1B1+SocE2B1+TimeB1)/3]*10
    return (
      ((checkAnswer(survey, 'SocE1B1', 'answer') +
        checkAnswer(survey, 'SocE2B1', 'answer') +
        checkAnswer(survey, 'TimeB1', 'answer')) /
        3) *
        10 || null
    );
  },
  FeedbackUserMotivationB1: survey => {
    // [(HabitB1+OutEB1+ConfB1+RoleB1)/2]*5
    return (
      ((checkAnswer(survey, 'HabitB1', 'answer') +
        checkAnswer(survey, 'OutEB1', 'answer') +
        checkAnswer(survey, 'ConfB1', 'answer') +
        checkAnswer(survey, 'RoleB1', 'answer')) /
        2) *
        5 || null
    );
  },
  FeedbackUserCapabilityB2: survey => {
    // (KnowB2+SkillB2)*5
    return (
      (checkAnswer(survey, 'KnowB2', 'answer') +
        checkAnswer(survey, 'SkillB2', 'answer')) *
        2 || null
    );
  },
  FeedbackUserOpportunityB2: survey => {
    // [(SocE1B2+SocE2B2+TimeB2)/3]*10
    return (
      ((checkAnswer(survey, 'SocE1B2', 'answer') +
        checkAnswer(survey, 'SocE2B2', 'answer') +
        checkAnswer(survey, 'TimeB2', 'answer')) /
        3) *
        10 || null
    );
  },
  FeedbackUserMotivationB2: survey => {
    // [(HabitB2+OutEB2+ConfB2+RoleB2)/2]*5
    return (
      ((checkAnswer(survey, 'HabitB2', 'answer') +
        checkAnswer(survey, 'OutEB2', 'answer') +
        checkAnswer(survey, 'ConfB2', 'answer') +
        checkAnswer(survey, 'RoleB2', 'answer')) /
        2) *
        5 || null
    );
  },
  FeedbackUserCapabilityB3: survey => {
    // (KnowB3+SkillB3)*5
    return (
      (checkAnswer(survey, 'KnowB3', 'answer') +
        checkAnswer(survey, 'SkillB3', 'answer')) *
        5 || null
    );
  },
  FeedbackUserOpportunityB3: survey => {
    // [(SocE1B3+SocE2B3+TimeB3)/3]*10
    return (
      ((checkAnswer(survey, 'SocE1B3', 'answer') +
        checkAnswer(survey, 'SocE2B3', 'answer') +
        checkAnswer(survey, 'TimeB3', 'answer')) /
        3) *
        10 || null
    );
  },
  FeedbackUserMotivationB3: survey => {
    // [(HabitB3+OutEB3+ConfB3+RoleB3)/2]*5
    return (
      ((checkAnswer(survey, 'HabitB3', 'answer') +
        checkAnswer(survey, 'OutEB3', 'answer') +
        checkAnswer(survey, 'ConfB3', 'answer') +
        checkAnswer(survey, 'RoleB3', 'answer')) /
        2) *
        5 || null
    );
  },
};

const calculateAverage = array => {
  const filteredNumbers = array.filter(_item => !!_item);

  const total = filteredNumbers.reduce((prev, curr) => {
    return prev + curr;
  }, 0);

  return total / filteredNumbers.length || null;
};

const calculator = (answers, allAnswers) => {
  const preDay1Answers = checkAnswer(answers, 'pre-day-1');
  const postDay1Answers = checkAnswer(answers, 'post-day-1');
  const postDay2Answers = checkAnswer(answers, 'post-day-2');
  const postDay3Answers = checkAnswer(answers, 'post-day-3');
  const postSpecialAnswers = checkAnswer(answers, 'post-special');
  const followup3Months = checkAnswer(answers, 'follow-up-3-month');
  const followup6Months = checkAnswer(answers, 'follow-up-6-month');

  const answersBaseOnSurveyType = {
    'pre-day-1': preDay1Answers,
    'post-day-1': postDay1Answers,
    'post-day-2': postDay2Answers,
    'post-day-3': postDay3Answers,
    'post-special': postSpecialAnswers,
    'follow-up-3-month': followup3Months,
    'follow-up-6-month': followup6Months,
  };

  return {
    categorized: [
      {
        text:
          'When you think about suggesting to people ways in which they could take action on their own mental health or wellbeing, you perceive your capability/opportunity/motivation to be:',
        surveys: [
          'pre-day-1',
          'post-day-1',
          'post-special',
          'follow-up-3-month',
          'follow-up-6-month',
        ].map(surveyType => ({
          surveyType: readableSurveysNamePairs[surveyType],
          categories: [
            {
              category: 'Capability',
              value: output.FeedbackUserCapabilityB1(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  output.FeedbackUserCapabilityB1(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: output.FeedbackUserOpportunityB1(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  output.FeedbackUserOpportunityB1(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: output.FeedbackUserMotivationB1(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  output.FeedbackUserMotivationB1(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
          ],
        })),
      },
      // -----------------------------
      {
        text:
          'When you think about having a conversation with people in which you develop a shared understanding of their mental health and wellbeing needs, you perceive your capability/opportunity/motivation to be:',
        surveys: [
          'pre-day-1',
          'post-day-2',
          'post-special',
          'follow-up-3-month',
          'follow-up-6-month',
        ].map(surveyType => ({
          surveyType: readableSurveysNamePairs[surveyType],
          categories: [
            {
              category: 'Capability',
              value: output.FeedbackUserCapabilityB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  output.FeedbackUserCapabilityB2(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: output.FeedbackUserOpportunityB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  output.FeedbackUserOpportunityB2(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: output.FeedbackUserMotivationB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  output.FeedbackUserMotivationB2(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
          ],
        })),
      },
      // ----------------------------
      {
        text:
          'When you think about using appropriate conversational methods to empower poeple to make a change that addresses their mental health and wellbeing needs, you perceive your capability/opportunity/motivation to be:',
        surveys: [
          'pre-day-1',
          'post-day-3',
          'post-special',
          'follow-up-3-month',
          'follow-up-6-month',
        ].map(surveyType => ({
          surveyType: readableSurveysNamePairs[surveyType],
          categories: [
            {
              category: 'Capability',
              value: output.FeedbackUserCapabilityB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  output.FeedbackUserCapabilityB2(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: output.FeedbackUserOpportunityB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  output.FeedbackUserOpportunityB2(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: output.FeedbackUserMotivationB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  output.FeedbackUserMotivationB2(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
          ],
        })),
      },
    ],
  };
};
