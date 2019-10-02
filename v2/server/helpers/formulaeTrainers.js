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
  const answersPerSurvey = {
    'pre-day-1': [],
    'post-day-1': [],
    'post-day-2': [],
    'post-day-3': [],
    'post-special': [],
    'follow-up-3-month': [],
    'follow-up-6-month': [],
  };

  subGroupAnswers.forEach(PINsSurvey => {
    Object.entries(PINsSurvey).forEach(([surveyType, answersObject]) => {
      answersPerSurvey[surveyType].push(answersObject);
    });
  });

  const answersPerSurveyAll = {
    'pre-day-1': [],
    'post-day-1': [],
    'post-day-2': [],
    'post-day-3': [],
    'post-special': [],
    'follow-up-3-month': [],
    'follow-up-6-month': [],
  };
  allAnswers.forEach(PINsSurvey => {
    Object.entries(PINsSurvey).forEach(([surveyType, answersObject]) => {
      answersPerSurveyAll[surveyType].push(answersObject);
    });
  });

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
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB1(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB1(answersObject)
                )
              ),
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
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB2(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB2(answersObject)
                )
              ),
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
                answersPerSurvey[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB3(answersObject)
                )
              ),
              average: calculateAverage(
                answersPerSurveyAll[surveyType].map(answersObject =>
                  behavioralFormulae.FeedbackUserCapabilityB3(answersObject)
                )
              ),
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
              answersPerSurvey[surveyType].map(answersObject =>
                behavioralFormulae.FeedbackUserB1(answersObject)
              )
            ),
            average: calculateAverage(
              answersPerSurveyAll[surveyType].map(answersObject =>
                behavioralFormulae.FeedbackUserB1(answersObject)
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
              answersPerSurvey[surveyType].map(answersObject =>
                behavioralFormulae.FeedbackUserB2(answersObject)
              )
            ),
            average: calculateAverage(
              answersPerSurveyAll[surveyType].map(answersObject =>
                behavioralFormulae.FeedbackUserB2(answersObject)
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
              answersPerSurvey[surveyType].map(answersObject =>
                behavioralFormulae.FeedbackUserB3(answersObject)
              )
            ),
            average: calculateAverage(
              answersPerSurveyAll[surveyType].map(answersObject =>
                behavioralFormulae.FeedbackUserB3(answersObject)
              )
            ),
          })
        ),
      },
    ],
  };
};

module.exports = calculator;
