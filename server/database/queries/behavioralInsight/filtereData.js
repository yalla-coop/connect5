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

  const toLowerCaseArray = array => array.map(item => item.toLowerCase());

  const ageMatch = age
    ? { $in: [{ $toLower: '$age' }, toLowerCaseArray(age)] }
    : true;

  const genderMatch = gender
    ? { $in: [{ $toLower: '$gender' }, toLowerCaseArray(gender)] }
    : true;

  const ethnicMatch = ethnic
    ? { $in: [{ $toLower: '$ethnic' }, toLowerCaseArray(ethnic)] }
    : true;

  const regionMatch = region
    ? { $in: [{ $toLower: '$region' }, toLowerCaseArray(region)] }
    : true;

  const workforceMatch = workforce
    ? { $in: [{ $toLower: '$workforce' }, toLowerCaseArray(workforce)] }
    : true;

  const sessionTypeMatch = sessionType
    ? { $in: ['$sessionType', sessionType] }
    : true;

  const surveyTypeMatch = surveyType
    ? { $in: ['$surveyType', surveyType] }
    : true;

  const sessionIdMatch = sessionId
    ? { $eq: ['$sessionId', mongoose.Types.ObjectId(sessionId)] }
    : true;

  const PINMatch = PIN
    ? { $eq: [{ $toLower: '$PIN' }, PIN.toLowerCase()] }
    : true;

  const filteredResultsMatch = {
    $expr: {
      $and: [
        ageMatch,
        genderMatch,
        ethnicMatch,
        regionMatch,
        workforceMatch,
        sessionTypeMatch,
        sessionIdMatch,
        PINMatch,
      ],
    },
  };

  const allResultsMatch = {
    $expr: {
      $and: [ageMatch, genderMatch, ethnicMatch, regionMatch, workforceMatch],
    },
  };

  if (trainer) {
    filteredResultsMatch.trainers = {
      $in: trainer.map(_trainerId => mongoose.Types.ObjectId(_trainerId)),
    };
  }

  if (manager) {
    filteredResultsMatch.managers = {
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
      $facet: {
        allResults: [
          {
            $match: allResultsMatch,
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
            $match: {
              'question.code': { $exists: true },
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
        ],
        filteredResults: [
          {
            $match: filteredResultsMatch,
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
            $match: {
              'question.code': { $exists: true },
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
        ],
      },
    },
  ]);

  const formedData = {
    filteredResults: {},
    allResults: {},
  };

  // re-shape the filtered results
  results[0].filteredResults.forEach(question => {
    const { PIN: _PIN, answer, surveyType: _surveyType, code } = question;
    if (_PIN) {
      if (!formedData.filteredResults[_PIN]) {
        formedData.filteredResults[_PIN] = {};
      }
      if (!formedData.filteredResults[_PIN][_surveyType]) {
        formedData.filteredResults[_PIN][_surveyType] = {};
      }
      if (code && (Number(answer) || Number(answer) === 0)) {
        formedData.filteredResults[_PIN][_surveyType][code] = Number(answer);
      }
    }
  });

  // re-shape all results
  results[0].allResults.forEach(question => {
    const { PIN: _PIN, answer, surveyType: _surveyType, code } = question;
    if (_PIN) {
      if (!formedData.allResults[_PIN]) {
        formedData.allResults[_PIN] = {};
      }
      if (!formedData.allResults[_PIN][_surveyType]) {
        formedData.allResults[_PIN][_surveyType] = {};
      }
      if (code && (Number(answer) || Number(answer) === 0)) {
        formedData.allResults[_PIN][_surveyType][code] = Number(answer);
      }
    }
  });

  formedData.filteredResults = Object.values(formedData.filteredResults);
  formedData.allResults = Object.values(formedData.allResults);
  return formedData;
};
