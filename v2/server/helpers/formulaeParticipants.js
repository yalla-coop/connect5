const { readableSurveysNamePairs } = require('../constants');

/** ------------------------input shape--------------------------
 * input shape
 * userAnswers
 * {
      '<survey-type>': {
        '<code>': Number, // the answer value, Null for not answered questions
      },
    };

  * allAnswers
    [
      {
        '<survey-type>': {
          '<code>':  Number, // the answer value, Null for not answered questions
        },
      };
    ]

    Example
    {
      'pre-day-1': {
        KnowB1: 3
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
  if (paths[0] && paths[1] && paths[0][paths[1]]) {
    return checkAnswer(paths[0][paths[1]], ...paths.slice(2));
  }

  return undefined;
};

const calculatedAnswersByCode = {
  FeedbackUserCapabilityB1: survey => {
    // (KnowB1+SkillB1)*5
    return (
      (checkAnswer(survey, 'KnowB1') + checkAnswer(survey, 'SkillB1')) * 5 ||
      null
    );
  },
  FeedbackUserOpportunityB1: survey => {
    // [(SocE1B1+SocE2B1+TimeB1)/3]*10
    return (
      ((checkAnswer(survey, 'SocE1B1') +
        checkAnswer(survey, 'SocE2B1') +
        checkAnswer(survey, 'TimeB1')) /
        3) *
        10 || null
    );
  },
  FeedbackUserMotivationB1: survey => {
    // [(HabitB1+OutEB1+ConfB1+RoleB1)/2]*5
    return (
      ((checkAnswer(survey, 'HabitB1') +
        checkAnswer(survey, 'OutEB1') +
        checkAnswer(survey, 'ConfB1') +
        checkAnswer(survey, 'RoleB1')) /
        2) *
        5 || null
    );
  },
  FeedbackUserCapabilityB2: survey => {
    // (KnowB2+SkillB2)*5
    return (
      (checkAnswer(survey, 'KnowB2') + checkAnswer(survey, 'SkillB2')) * 2 ||
      null
    );
  },
  FeedbackUserOpportunityB2: survey => {
    // [(SocE1B2+SocE2B2+TimeB2)/3]*10
    return (
      ((checkAnswer(survey, 'SocE1B2') +
        checkAnswer(survey, 'SocE2B2') +
        checkAnswer(survey, 'TimeB2')) /
        3) *
        10 || null
    );
  },
  FeedbackUserMotivationB2: survey => {
    // [(HabitB2+OutEB2+ConfB2+RoleB2)/2]*5
    return (
      ((checkAnswer(survey, 'HabitB2') +
        checkAnswer(survey, 'OutEB2') +
        checkAnswer(survey, 'ConfB2') +
        checkAnswer(survey, 'RoleB2')) /
        2) *
        5 || null
    );
  },
  FeedbackUserCapabilityB3: survey => {
    // (KnowB3+SkillB3)*5
    return (
      (checkAnswer(survey, 'KnowB3') + checkAnswer(survey, 'SkillB3')) * 5 ||
      null
    );
  },
  FeedbackUserOpportunityB3: survey => {
    // [(SocE1B3+SocE2B3+TimeB3)/3]*10
    return (
      ((checkAnswer(survey, 'SocE1B3') +
        checkAnswer(survey, 'SocE2B3') +
        checkAnswer(survey, 'TimeB3')) /
        3) *
        10 || null
    );
  },
  FeedbackUserMotivationB3: survey => {
    // [(HabitB3+OutEB3+ConfB3+RoleB3)/2]*5
    return (
      ((checkAnswer(survey, 'HabitB3') +
        checkAnswer(survey, 'OutEB3') +
        checkAnswer(survey, 'ConfB3') +
        checkAnswer(survey, 'RoleB3')) /
        2) *
        5 || null
    );
  },
  // for "in last week"
  FeedbackUserB1: survey => {
    // (B1/people)*100
    return (
      (checkAnswer(survey, 'B1') + checkAnswer(survey, 'people')) * 100 || null
    );
  },
  FeedbackUserB2: survey => {
    // (B2/people)*100
    return (
      (checkAnswer(survey, 'B2') + checkAnswer(survey, 'people')) * 100 || null
    );
  },
  FeedbackUserB3: survey => {
    // (B3/people)*100
    return (
      (checkAnswer(survey, 'B3') + checkAnswer(survey, 'people')) * 100 || null
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
              value: calculatedAnswersByCode.FeedbackUserCapabilityB1(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  calculatedAnswersByCode.FeedbackUserCapabilityB1(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: calculatedAnswersByCode.FeedbackUserOpportunityB1(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  calculatedAnswersByCode.FeedbackUserOpportunityB1(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: calculatedAnswersByCode.FeedbackUserMotivationB1(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  calculatedAnswersByCode.FeedbackUserMotivationB1(
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
              value: calculatedAnswersByCode.FeedbackUserCapabilityB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  calculatedAnswersByCode.FeedbackUserCapabilityB2(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: calculatedAnswersByCode.FeedbackUserOpportunityB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  calculatedAnswersByCode.FeedbackUserOpportunityB2(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: calculatedAnswersByCode.FeedbackUserMotivationB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  calculatedAnswersByCode.FeedbackUserMotivationB2(
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
              value: calculatedAnswersByCode.FeedbackUserCapabilityB3(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  calculatedAnswersByCode.FeedbackUserCapabilityB3(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: calculatedAnswersByCode.FeedbackUserOpportunityB3(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  calculatedAnswersByCode.FeedbackUserOpportunityB3(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: calculatedAnswersByCode.FeedbackUserMotivationB3(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  calculatedAnswersByCode.FeedbackUserMotivationB3(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
          ],
        })),
      },
    ],
    nonCategorized: [
      {
        text:
          'You suggested to people who needed it,  ways they could take action on their own mental health or wellbeing',
        surveys: ['pre-day-1', 'follow-up-3-month', 'follow-up-6-month'].map(
          surveyType => ({
            surveyType: readableSurveysNamePairs[surveyType],
            value: calculatedAnswersByCode.FeedbackUserB1(
              answersBaseOnSurveyType[surveyType]
            ),
            average: calculateAverage(
              allAnswers.map(otherUserAnswers =>
                calculatedAnswersByCode.FeedbackUserB1(
                  checkAnswer(otherUserAnswers, surveyType)
                )
              )
            ),
          })
        ),
      },
      {
        text:
          'You had a conversation with people who needed it,  in which you developed a shared understanding of their mental health and wellbeing needs',
        surveys: ['pre-day-1', 'follow-up-3-month', 'follow-up-6-month'].map(
          surveyType => ({
            surveyType: readableSurveysNamePairs[surveyType],
            value: calculatedAnswersByCode.FeedbackUserB2(
              answersBaseOnSurveyType[surveyType]
            ),
            average: calculateAverage(
              allAnswers.map(otherUserAnswers =>
                calculatedAnswersByCode.FeedbackUserB2(
                  checkAnswer(otherUserAnswers, surveyType)
                )
              )
            ),
          })
        ),
      },
      {
        text:
          'You used appropriate conversational methods to empower people who needed it, to make a change that addresses their mental health and wellbeing needs',
        surveys: ['pre-day-1', 'follow-up-3-month', 'follow-up-6-month'].map(
          surveyType => ({
            surveyType: readableSurveysNamePairs[surveyType],
            value: calculatedAnswersByCode.FeedbackUserB3(
              answersBaseOnSurveyType[surveyType]
            ),
            average: calculateAverage(
              allAnswers.map(otherUserAnswers =>
                calculatedAnswersByCode.FeedbackUserB3(
                  checkAnswer(otherUserAnswers, surveyType)
                )
              )
            ),
          })
        ),
      },
    ],
  };
};

module.exports = calculator;
