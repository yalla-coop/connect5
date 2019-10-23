const { readableSurveysNamePairs } = require('../constants');
const { calculateAverage } = require('./index');
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
      'pre-course': {
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
  const answersPerSurvey = {
    'pre-course': [],
    'post-day-1': [],
    '3-months-follow-up-day-1': [],
    '6-months-follow-up-day-1': [],

    'post-day-2': [],
    '3-months-follow-up-day-2': [],
    '6-months-follow-up-day-2': [],

    'post-day-3': [],
    '3-months-follow-up-day-3': [],
    '6-months-follow-up-day-3': [],

    'post-special': [],
    '3-months-follow-up-special-2-days': [],
    '6-months-follow-up-special-2-days': [],
  };

  subGroupAnswers.forEach(PINsSurvey => {
    Object.entries(PINsSurvey).forEach(([surveyType, answersObject]) => {
      if (answersPerSurvey[surveyType]) {
        answersPerSurvey[surveyType].push(answersObject);
      }
    });
  });

  const answersPerSurveyAll = {
    'pre-course': [],
    'post-day-1': [],
    '3-months-follow-up-day-1': [],
    '6-months-follow-up-day-1': [],

    'post-day-2': [],
    '3-months-follow-up-day-2': [],
    '6-months-follow-up-day-2': [],

    'post-day-3': [],
    '3-months-follow-up-day-3': [],
    '6-months-follow-up-day-3': [],

    'post-special': [],
    '3-months-follow-up-special-2-days': [],
    '6-months-follow-up-special-2-days': [],
  };
  allAnswers.forEach(PINsSurvey => {
    Object.entries(PINsSurvey).forEach(([surveyType, answersObject]) => {
      if (answersPerSurveyAll[surveyType]) {
        answersPerSurveyAll[surveyType].push(answersObject);
      }
    });
  });

  return {
    categorized: [
      // ---------------------------- first chart ------------------
      {
        text:
          'When they think about suggesting to people ways in which they could take action on their own mental health or wellbeing, they perceive their capability/opportunity/motivation to be:',
        textParticipant:
          'When you think about suggesting to people ways in which they could take action on their own mental health or wellbeing, you perceive your capability/opportunity/motivation to be:',
        surveys: [
          'pre-course',
          // 'post-day-1',
          '3-months-follow-up-day-1',
          '6-months-follow-up-day-1',

          '3-months-follow-up-special-2-days',
          '6-months-follow-up-special-2-days',
        ].map(surveyType => ({
          surveyType,
          readableName: readableSurveysNamePairs[surveyType],
          categories: [
            {
              category: 'Capability',
              value: calculateAverage(
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB1(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB1(answersObject)
                )
              ),
              responsesCount: answersPerSurveyAll[surveyType].map(
                answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB1(answersObject)
              ).length,
            },
            {
              category: 'Opportunity',
              value: calculateAverage(
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserOpportunityB1(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserOpportunityB1(answersObject)
                )
              ),
              responsesCount: answersPerSurveyAll[surveyType].map(
                answersObject =>
                  behavioralFormulae.FeedbackUserOpportunityB1(answersObject)
              ).length,
            },
            {
              category: 'Motivation',
              value: calculateAverage(
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserMotivationB1(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserMotivationB1(answersObject)
                )
              ),
              responsesCount: answersPerSurveyAll[surveyType].map(
                answersObject =>
                  behavioralFormulae.FeedbackUserMotivationB1(answersObject)
              ).length,
            },
          ],
        })),
      },
      // ----------------------------- second chart ---------------
      {
        text:
          'When they think about having a conversation with people in which you develop a shared understanding of their mental health and wellbeing needs, they perceive their capability/opportunity/motivation to be',
        textParticipant:
          'When you think about having a conversation with people in which you develop a shared understanding of their mental health and wellbeing needs, you perceive your capability/opportunity/motivation to be',

        surveys: [
          'pre-course',
          // 'post-day-1',
          '3-months-follow-up-day-1',
          '6-months-follow-up-day-1',

          '3-months-follow-up-special-2-days',
          '6-months-follow-up-special-2-days',
        ].map(surveyType => ({
          surveyType,
          readableName: readableSurveysNamePairs[surveyType],
          categories: [
            {
              category: 'Capability',
              value: calculateAverage(
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB2(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB2(answersObject)
                )
              ),
              responsesCount: answersPerSurveyAll[surveyType].map(
                answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB2(answersObject)
              ).length,
            },
            {
              category: 'Opportunity',
              value: calculateAverage(
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserOpportunityB2(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserOpportunityB2(answersObject)
                )
              ),
              responsesCount: answersPerSurveyAll[surveyType].map(
                answersObject =>
                  behavioralFormulae.FeedbackUserOpportunityB2(answersObject)
              ).length,
            },
            {
              category: 'Motivation',
              value: calculateAverage(
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserMotivationB2(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserMotivationB2(answersObject)
                )
              ),
              responsesCount: answersPerSurveyAll[surveyType].map(
                answersObject =>
                  behavioralFormulae.FeedbackUserMotivationB2(answersObject)
              ).length,
            },
          ],
        })),
      },
      // ----------------------------  third chart ---------------------
      {
        text:
          'When they think about using appropriate conversational methods to empower poeple to make a change that addresses their mental health and wellbeing needs, they perceive their capability/opportunity/motivation to be:',
        textParticipant:
          'When you think about using appropriate conversational methods to empower poeple to make a change that addresses their mental health and wellbeing needs, you perceive your capability/opportunity/motivation to be:',
        surveys: [
          'pre-course',
          // 'post-day-1',
          '3-months-follow-up-day-1',
          '6-months-follow-up-day-1',

          '3-months-follow-up-special-2-days',
          '6-months-follow-up-special-2-days',
        ].map(surveyType => ({
          surveyType,
          readableName: readableSurveysNamePairs[surveyType],
          categories: [
            {
              category: 'Capability',
              value: calculateAverage(
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB3(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB3(answersObject)
                )
              ),
              responsesCount: answersPerSurveyAll[surveyType].map(
                answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB3(answersObject)
              ).length,
            },
            {
              category: 'Opportunity',
              value: calculateAverage(
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserOpportunityB3(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserOpportunityB3(answersObject)
                )
              ),
              responsesCount: answersPerSurveyAll[surveyType].map(
                answersObject =>
                  behavioralFormulae.FeedbackUserOpportunityB3(answersObject)
              ).length,
            },
            {
              category: 'Motivation',
              value: calculateAverage(
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserMotivationB3(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserMotivationB3(answersObject)
                )
              ),
              responsesCount: answersPerSurveyAll[surveyType].map(
                answersObject =>
                  behavioralFormulae.FeedbackUserMotivationB3(answersObject)
              ).length,
            },
          ],
        })),
      },
    ],
    // ----------------------- non categorized charts-----------
    nonCategorized: [
      {
        text:
          'They suggested to people who needed it, ways they could take action on their own mental health or wellbeing',
        textParticipant:
          'You suggested to people who needed it, ways they could take action on their own mental health or wellbeing',
        surveys: [
          'pre-course',
          '3-months-follow-up-day-1',
          '6-months-follow-up-day-1',

          '3-months-follow-up-special-2-days',
          '6-months-follow-up-special-2-days',
        ].map(surveyType => ({
          surveyType,
          readableName: readableSurveysNamePairs[surveyType],
          value: calculateAverage(
            answersPerSurvey[surveyType].map(answersObject =>
              behavioralFormulae.FeedbackUserB1(answersObject)
            )
          ),
          average: calculateAverage(
            answersPerSurveyAll[surveyType].map(answersObject =>
              behavioralFormulae.FeedbackUserB1(answersObject)
            )
          ),
          responsesCount: answersPerSurveyAll[surveyType].map(answersObject =>
            behavioralFormulae.FeedbackUserB1(answersObject)
          ).length,
        })),
      },
      {
        text:
          'They had a conversation with of people who needed it, in which they developed a shared understanding of their mental health and wellbeing needs',
        textParticipant:
          'You had a conversation with of people who needed it, in which you developed a shared understanding of their mental health and wellbeing needs',
        surveys: [
          'pre-course',
          '3-months-follow-up-day-1',
          '6-months-follow-up-day-1',

          '3-months-follow-up-special-2-days',
          '6-months-follow-up-special-2-days',
        ].map(surveyType => ({
          surveyType,
          readableName: readableSurveysNamePairs[surveyType],
          value: calculateAverage(
            answersPerSurvey[surveyType].map(answersObject =>
              behavioralFormulae.FeedbackUserB2(answersObject)
            )
          ),
          average: calculateAverage(
            answersPerSurveyAll[surveyType].map(answersObject =>
              behavioralFormulae.FeedbackUserB2(answersObject)
            )
          ),
          responsesCount: answersPerSurveyAll[surveyType].map(answersObject =>
            behavioralFormulae.FeedbackUserB2(answersObject)
          ).length,
        })),
      },
      {
        text:
          'They used appropriate conversational methods to empower people who needed it, to make a change that addresses their mental health and wellbeing needs',
        textParticipant:
          'You used appropriate conversational methods to empower people who needed it, to make a change that addresses their mental health and wellbeing needs',
        surveys: [
          'pre-course',
          '3-months-follow-up-day-1',
          '6-months-follow-up-day-1',

          '3-months-follow-up-special-2-days',
          '6-months-follow-up-special-2-days',
        ].map(surveyType => ({
          surveyType,
          readableName: readableSurveysNamePairs[surveyType],
          value: calculateAverage(
            answersPerSurvey[surveyType].map(answersObject =>
              behavioralFormulae.FeedbackUserB3(answersObject)
            )
          ),
          average: calculateAverage(
            answersPerSurveyAll[surveyType].map(answersObject =>
              behavioralFormulae.FeedbackUserB3(answersObject)
            )
          ),
          responsesCount: answersPerSurveyAll[surveyType].map(answersObject =>
            behavioralFormulae.FeedbackUserB3(answersObject)
          ).length,
        })),
      },
    ],
  };
};

module.exports = calculator;
