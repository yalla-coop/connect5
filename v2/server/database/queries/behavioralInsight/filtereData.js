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
        surveyType: 1,
      },
    },
  ]);

  const formedData = [];
  results.forEach(question => {
    const { PIN, answer, surveyType: _surveyType, code } = question;
    if (PIN) {
      if (formedData[PIN]) {
        if (formedData[PIN][_surveyType]) {
          formedData[PIN][_surveyType][code] = Number(answer);
        } else {
          formedData[PIN][_surveyType] = {};
        }
      } else {
        formedData[PIN] = {};
      }
    }
  });

  return Object.values(formedData)[0];
};
