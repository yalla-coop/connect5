const { readableSurveysNamePairs } = require('../constants');
const { checkAnswer, calculateAverage } = require('./index');
const behavioralFormulae = require('./behavioralFormulae');

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
      // ---------------------------- first chart ------------------
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
              value: behavioralFormulae.FeedbackUserCapabilityB1(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserCapabilityB1(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: behavioralFormulae.FeedbackUserOpportunityB1(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserOpportunityB1(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: behavioralFormulae.FeedbackUserMotivationB1(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserMotivationB1(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
          ],
        })),
      },
      // ----------------------------- second chart ---------------
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
              value: behavioralFormulae.FeedbackUserCapabilityB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserCapabilityB2(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: behavioralFormulae.FeedbackUserOpportunityB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserOpportunityB2(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: behavioralFormulae.FeedbackUserMotivationB2(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserMotivationB2(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
          ],
        })),
      },
      // ----------------------------  third chart ---------------------
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
              value: behavioralFormulae.FeedbackUserCapabilityB3(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserCapabilityB3(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: behavioralFormulae.FeedbackUserOpportunityB3(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserOpportunityB3(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
            {
              category: 'Opportunity',
              value: behavioralFormulae.FeedbackUserMotivationB3(
                answersBaseOnSurveyType[surveyType]
              ),
              average: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserMotivationB3(
                    checkAnswer(otherUserAnswers, surveyType)
                  )
                )
              ),
            },
          ],
        })),
      },
    ],
    // ----------------------- non categorized charts-----------
    nonCategorized: [
      {
        text:
          'You suggested to people who needed it,  ways they could take action on their own mental health or wellbeing',
        surveys: ['pre-day-1', 'follow-up-3-month', 'follow-up-6-month'].map(
          surveyType => ({
            surveyType: readableSurveysNamePairs[surveyType],
            value: behavioralFormulae.FeedbackUserB1(
              answersBaseOnSurveyType[surveyType]
            ),
            average: calculateAverage(
              allAnswers.map(otherUserAnswers =>
                behavioralFormulae.FeedbackUserB1(
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
            value: behavioralFormulae.FeedbackUserB2(
              answersBaseOnSurveyType[surveyType]
            ),
            average: calculateAverage(
              allAnswers.map(otherUserAnswers =>
                behavioralFormulae.FeedbackUserB2(
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
            value: behavioralFormulae.FeedbackUserB3(
              answersBaseOnSurveyType[surveyType]
            ),
            average: calculateAverage(
              allAnswers.map(otherUserAnswers =>
                behavioralFormulae.FeedbackUserB3(
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
