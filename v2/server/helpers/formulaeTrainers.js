const { readableSurveysNamePairs } = require('../constants');
const { checkAnswer, calculateAverage } = require('./index');
const behavioralFormulae = require('./behavioralFormulae');

/** ------------------------input shape--------------------------
 * input shape
 * subGroupAnswers - sup group responses to calculate the bahavioral insight for them
    [
      {
        '<survey-type>': {
          '<code>':  Number, // the answer value, Null for not answered questions
        },
      };
    ]

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

const calculator = (subGroupAnswers, allAnswers) => {
  const preDay1Answers = checkAnswer(subGroupAnswers, 'pre-day-1');
  const postDay1Answers = checkAnswer(subGroupAnswers, 'post-day-1');
  const postDay2Answers = checkAnswer(subGroupAnswers, 'post-day-2');
  const postDay3Answers = checkAnswer(subGroupAnswers, 'post-day-3');
  const postSpecialAnswers = checkAnswer(subGroupAnswers, 'post-special');
  const followup3Months = checkAnswer(subGroupAnswers, 'follow-up-3-month');
  const followup6Months = checkAnswer(subGroupAnswers, 'follow-up-6-month');

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
          'When they think about suggesting to people ways in which they could take action on their own mental health or wellbeing, you perceive your capability/opportunity/motivation to be:',
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
              value: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserCapabilityB1(
                    answersBaseOnSurveyType[surveyType]
                  )
                )
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
              value: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserOpportunityB1(
                    answersBaseOnSurveyType[surveyType]
                  )
                )
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
              value: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserMotivationB1(
                    answersBaseOnSurveyType[surveyType]
                  )
                )
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
          'When they think about having a conversation with people in which they develop a shared understanding of their mental health and wellbeing needs, you perceive your capability/opportunity/motivation to be:',
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
              value: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserCapabilityB2(
                    answersBaseOnSurveyType[surveyType]
                  )
                )
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
              value: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserOpportunityB2(
                    answersBaseOnSurveyType[surveyType]
                  )
                )
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
              value: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserMotivationB2(
                    answersBaseOnSurveyType[surveyType]
                  )
                )
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
          'When they think about using appropriate conversational methods to empower poeple to make a change that addresses their mental health and wellbeing needs, you perceive your capability/opportunity/motivation to be:',
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
              value: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserCapabilityB3(
                    answersBaseOnSurveyType[surveyType]
                  )
                )
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
              value: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserOpportunityB3(
                    answersBaseOnSurveyType[surveyType]
                  )
                )
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
              value: calculateAverage(
                allAnswers.map(otherUserAnswers =>
                  behavioralFormulae.FeedbackUserMotivationB3(
                    answersBaseOnSurveyType[surveyType]
                  )
                )
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
          'They suggested to people who needed it,  ways they could take action on their own mental health or wellbeing',
        surveys: ['pre-day-1', 'follow-up-3-month', 'follow-up-6-month'].map(
          surveyType => ({
            surveyType: readableSurveysNamePairs[surveyType],
            value: calculateAverage(
              allAnswers.map(otherUserAnswers =>
                behavioralFormulae.FeedbackUserB1(
                  answersBaseOnSurveyType[surveyType]
                )
              )
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
          'They had a conversation with people who needed it,  in which you developed a shared understanding of their mental health and wellbeing needs',
        surveys: ['pre-day-1', 'follow-up-3-month', 'follow-up-6-month'].map(
          surveyType => ({
            surveyType: readableSurveysNamePairs[surveyType],
            value: calculateAverage(
              allAnswers.map(otherUserAnswers =>
                behavioralFormulae.FeedbackUserB2(
                  answersBaseOnSurveyType[surveyType]
                )
              )
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
          'They used appropriate conversational methods to empower people who needed it, to make a change that addresses their mental health and wellbeing needs',
        surveys: ['pre-day-1', 'follow-up-3-month', 'follow-up-6-month'].map(
          surveyType => ({
            surveyType: readableSurveysNamePairs[surveyType],
            value: calculateAverage(
              allAnswers.map(otherUserAnswers =>
                behavioralFormulae.FeedbackUserB3(
                  answersBaseOnSurveyType[surveyType]
                )
              )
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
