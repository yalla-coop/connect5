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
  } = filters;

  const ageMatch = age ? { $in: ['$age', age] } : true;
  const genderMatch = gender ? { $in: ['$gender', gender] } : true;
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
      $match: {
        $expr: {
          $and: [surveyTypeMatch],
        },
      },
    },
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
      },
    },
    {
      $match: match,
    },
    {
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
      $lookup: {
        from: 'questions',
        localField: 'answers.question',
        foreignField: '_id',
        as: 'question',
      },
    },
    {
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
            [0, 1, 2, 3, 4, 5], // for stars
          ],
        },
        surveyType: 1,
      },
    },
    {
      $match: {
        feedbackText: {
          $exists: true,
        },
      },
    },
    {
      $group: {
        _id: {
          text: '$feedbackText',
          answer: '$answer',
          surveyType: '$surveyType',
        },
        options: { $first: '$options' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        text: '$_id.text',
        answer: '$_id.answer',
        surveyType: '$_id.surveyType',
        count: 1, // the count of answer on question in survey
        options: 1,
      },
    },
    {
      $group: {
        _id: {
          text: '$text',
          surveyType: '$surveyType',
        },
        categories: { $push: { category: '$answer', count: '$count' } },
        totalCount: { $sum: '$count' }, // total replies on each survey
        options: { $first: '$options' },
      },
    },
    {
      $project: {
        _id: 0,
        text: '$_id.text',
        surveyType: '$_id.surveyType',
        categories: 1,
        totalCount: 1,
        options: 1,
      },
    },
  ]);

  const formedData = {};
  // const overAll = {};
  results.forEach(question => {
    const {
      options,
      text,
      surveyType: _surveyType,
      categories,
      totalCount,
    } = question;

    // calculate the average for each bar
    const categoriesWithAverage = {};
    options.forEach(option => {
      categoriesWithAverage[option] = 0;
    });
    categories.forEach(({ category, count }) => {
      categoriesWithAverage[category] = (count / totalCount) * 100;
    });

    if (formedData[text]) {
      // push the session data to the question
      formedData[text].sessions.push({
        surveyType: _surveyType,
        categories: categoriesWithAverage,
        totalCount,
      });

      formedData[text].overall.totalCount += totalCount;
      categories.forEach(({ category, count }) => {
        formedData[text].overall.categories[category] += count;
      });
    } else {
      // for new overall
      const categoriesWithCount = {};
      options.forEach(option => {
        categoriesWithCount[option] = 0;
      });
      categories.forEach(({ category, count }) => {
        categoriesWithCount[category] = count;
      });

      //
      formedData[text] = {
        text,
        // set overall session at first time
        overall: {
          categories: categoriesWithCount,
          totalCount, // the total count on a question
        },

        sessions: [
          {
            surveyType: _surveyType,
            categories: categoriesWithAverage,
            totalCount,
          },
        ],
      };
    }
  });

  const arrayData = Object.values(formedData);
  arrayData.forEach(feedback => {
    // calculate the average for each bar
    const categoriesWithAverage = {};

    Object.entries(feedback.overall.categories).forEach(([category, count]) => {
      categoriesWithAverage[category] =
        (count / feedback.overall.totalCount) * 100;
    });

    const overallSession = {
      surveyType: 'Overall',
      categories: categoriesWithAverage,
      totalCount: feedback.overall.totalCount,
    };

    feedback.sessions.unshift(overallSession);
    // eslint-disable-next-line no-param-reassign
    delete feedback.overall;
  });
  return arrayData;
};
