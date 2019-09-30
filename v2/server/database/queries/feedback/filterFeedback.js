const mongoose = require('mongoose');
const Response = require('./../../models/Response');

module.exports = async filters => {
  const {
    // comes from filters
    gender,
    age,
    ethnic,
    region,
    workforce,
    trainer,
    manager,
    sessionType,
    surveyType,
    // for specific session
    sessionId,
    // for specific participant
    PIN,
  } = filters;

  const ageMatch = age ? { $in: ['$age', age] } : true;
  const genderMatch = gender ? { $in: ['$gender', [gender]] } : true;
  const ethnicMatch = ethnic ? { $in: ['$ethnic', ethnic] } : true;
  const regionMatch = region ? { $in: ['$region', region] } : true;
  const workforceMatch = workforce ? { $in: ['$workforce', workforce] } : true;

  const sessionTypeMatch = sessionType
    ? { $in: ['$sessionType', sessionType] }
    : true;

  const surveyTypeMatch = surveyType
    ? { $in: ['$surveyType', surveyType] }
    : true;

  const sessionIdMatch = sessionId
    ? { $eq: ['$sessionId', mongoose.Types.ObjectId(sessionId)] }
    : true;

  const PINMatch = PIN ? { $eq: ['$PIN', PIN] } : true;

  const match = {
    $expr: {
      $and: [
        ageMatch,
        genderMatch,
        ethnicMatch,
        regionMatch,
        workforceMatch,
        sessionTypeMatch,
        sessionIdMatch,
        surveyTypeMatch,
        PINMatch,
      ],
    },
  };

  if (trainer) {
    match.trainers = {
      $in: trainer.map(_trainerId => mongoose.Types.ObjectId(_trainerId)),
    };
  }

  if (manager) {
    match.trainers = {
      $in: manager.map(_managerId => mongoose.Types.ObjectId(_managerId)),
    };
  }

  const results = await Response.aggregate([
    {
      $lookup: {
        from: 'sessions',
        localField: 'session',
        foreignField: '_id',
        as: 'session',
      },
    },
    {
      $lookup: {
        from: 'participants',
        localField: 'participant',
        foreignField: '_id',
        as: 'participant',
      },
    },
    {
      $addFields: {
        participant: {
          $arrayElemAt: ['$participant._id', 0],
        },
        PIN: {
          $arrayElemAt: ['$participant.PIN', 0],
        },
        age: {
          $arrayElemAt: ['$participant.age', 0],
        },
        gender: {
          $arrayElemAt: ['$participant.gender', 0],
        },
        ethnic: {
          $arrayElemAt: ['$participant.ethnic', 0],
        },
        region: {
          $arrayElemAt: ['$participant.region', 0],
        },
        workforce: {
          $arrayElemAt: ['$participant.workforce', 0],
        },
        managers: {
          $arrayElemAt: ['$session.canAccessResults', 0],
        },
        sessionType: {
          $arrayElemAt: ['$session.type', 0],
        },
        trainers: {
          $arrayElemAt: ['$session.trainers', 0],
        },
        sessionId: {
          $arrayElemAt: ['$session._id', 0],
        },
        surveyType: {
          $arrayElemAt: ['$session.surveyType', 0],
        },
      },
    },
    {
      $facet: {
        filterdResults: [
          {
            // filter the responses, returns all responses if there are no filters
            $match: match,
          },
          {
            // join respones with answers
            $lookup: {
              from: 'answers',
              localField: 'participant',
              foreignField: 'participant',
              as: 'answers',
            },
          },
          {
            $unwind: '$answers',
          },
          {
            // join answers with related question
            $lookup: {
              from: 'questions',
              localField: 'answers.question',
              foreignField: '_id',
              as: 'question',
            },
          },
          {
            // re-form data shape
            $project: {
              answer: '$answers.answer',
              PIN: 1,
              code: {
                $arrayElemAt: ['$question.code', 0],
              },
              feedbackText: {
                $arrayElemAt: ['$question.feedbackText', 0],
              },
              options: {
                $ifNull: [
                  { $arrayElemAt: ['$question.options', 0] },
                  [0, 1, 2, 3, 4, 5], // for stars questions that has no option
                ],
              },
              sessionType: 1,
            },
          },
          {
            // get the feedback questions only
            $match: {
              feedbackText: {
                $exists: true,
              },
            },
          },
          {
            // gruop answers with question feed back text and session type
            // then find the count for each answer
            // we need this step to get the count for each answer
            $group: {
              _id: {
                text: '$feedbackText',
                answer: '$answer',
                sessionType: '$sessionType',
              },
              options: { $first: '$options' },
              count: { $sum: 1 },
            },
          },
          {
            // make data shape shallow again
            $project: {
              text: '$_id.text',
              answer: '$_id.answer',
              sessionType: '$_id.sessionType',
              count: 1, // the count of answer on question in survey
              options: 1,
            },
          },
          {
            // group questions with sessions
            $group: {
              _id: {
                text: '$text',
                sessionType: '$sessionType',
              },
              // append the categories and the count for each group
              categories: { $push: { category: '$answer', count: '$count' } },
              totalCount: { $sum: '$count' }, // total replies on each survey
              options: { $first: '$options' },
            },
          },
          {
            // make data shallow again
            $project: {
              _id: 0,
              text: '$_id.text',
              sessionType: '$_id.sessionType',
              categories: 1,
              totalCount: 1,
              options: 1,
            },
          },
        ],
        allResults: [
          {
            // join respones with answers
            $lookup: {
              from: 'answers',
              localField: 'participant',
              foreignField: 'participant',
              as: 'answers',
            },
          },
          {
            $unwind: '$answers',
          },
          {
            // join answers with related question
            $lookup: {
              from: 'questions',
              localField: 'answers.question',
              foreignField: '_id',
              as: 'question',
            },
          },
          {
            // re-form data shape
            $project: {
              answer: '$answers.answer',
              PIN: 1,
              code: {
                $arrayElemAt: ['$question.code', 0],
              },
              feedbackText: {
                $arrayElemAt: ['$question.feedbackText', 0],
              },
              options: {
                $ifNull: [
                  { $arrayElemAt: ['$question.options', 0] },
                  [0, 1, 2, 3, 4, 5], // for stars questions that has no option
                ],
              },
              sessionType: 1,
            },
          },
          {
            // get the feedback questions only
            $match: {
              feedbackText: {
                $exists: true,
              },
            },
          },
          {
            // gruop answers with question feed back text and session type
            // then find the count for each answer
            // we need this step to get the count for each answer
            $group: {
              _id: {
                text: '$feedbackText',
                answer: '$answer',
                sessionType: '$sessionType',
              },
              options: { $first: '$options' },
              count: { $sum: 1 },
            },
          },
          {
            // make data shape shallow again
            $project: {
              text: '$_id.text',
              answer: '$_id.answer',
              sessionType: '$_id.sessionType',
              count: 1, // the count of answer on question in survey
              options: 1,
            },
          },
          {
            // group questions with sessions
            $group: {
              _id: {
                text: '$text',
                sessionType: '$sessionType',
              },
              // append the categories and the count for each group
              categories: { $push: { category: '$answer', count: '$count' } },
              totalCount: { $sum: '$count' }, // total replies on each survey
              options: { $first: '$options' },
            },
          },
          {
            // make data shallow again
            $project: {
              _id: 0,
              text: '$_id.text',
              sessionType: '$_id.sessionType',
              categories: 1,
              totalCount: 1,
              options: 1,
            },
          },
        ],
      },
    },
  ]);
  return results[0];
};
