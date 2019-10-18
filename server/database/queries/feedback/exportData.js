const mongoose = require('mongoose');

const Answer = require('../../models/Answer');

module.exports.exportData = filters => {
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
        surveyTypeMatch,
        PINMatch,
      ],
    },
  };

  if (trainer) {
    filteredResultsMatch.trainers = {
      $in: trainer.map(_trainerId => mongoose.Types.ObjectId(_trainerId)),
    };
  }

  if (manager) {
    filteredResultsMatch.trainers = {
      $in: manager.map(_managerId => mongoose.Types.ObjectId(_managerId)),
    };
  }

  return Answer.aggregate([
    {
      $lookup: {
        from: 'questions',
        localField: 'question',
        foreignField: '_id',
        as: 'question',
      },
    },
    {
      $unwind: '$question',
    },
    {
      $sort: {
        'question.group.order': 1,
        'question.subGroup.name': 1,
        'question.subGroup.order': -1,
      },
    },
    {
      $lookup: {
        from: 'responses',
        localField: 'response',
        foreignField: '_id',
        as: 'response',
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
      $unwind: '$participant',
    },
    {
      $unwind: '$response',
    },
    {
      $lookup: {
        from: 'sessions',
        localField: 'response.session',
        foreignField: '_id',
        as: 'session',
      },
    },
    {
      $unwind: '$session',
    },

    {
      $group: {
        _id: '$response._id',
        answers: { $push: '$$CURRENT' },
        participant: { $first: '$participant' },
        session: { $first: '$session' },
        responseDetails: { $first: '$response' },
      },
    },

    {
      $addFields: {
        answer: '$answer.answer',
        participant: '$participant._id',
        PIN: '$participant.PIN',
        age: '$participant.age',
        gender: '$participant.gender',
        ethnic: '$participant.ethnic',
        region: '$participant.region',
        workforce: '$participant.workforce',
        occupation: '$participant.occupation',

        managers: '$session.canAccessResults',

        trainers: '$session.trainers',
        sessionId: '$session._id',
        sessionDate: '$session.date',
        sessionType: '$session.type',
        sessionRegion: '$session.region',
        surveyType: '$responseDetails.surveyType',
      },
    },
    {
      $match: filteredResultsMatch,
    },
    {
      $lookup: {
        from: 'users',
        localField: 'trainers',
        foreignField: '_id',
        as: 'trainers',
      },
    },
    {
      $project: {
        _id: 1,
        'Participant PIN': '$PIN',
        'Participant Age': '$age',
        'Participant Gender': '$gender',
        'Participant Region': '$region',
        'Participant Ethnicity': '$ethnic',
        'Participant Occupation': '$occupation',
        'Participant Workforce': '$workforce',

        'Session Date': '$sessionDate',
        'Session Type': '$sessionType',
        'Session Region': '$sessionRegion',

        'Agreed to Research': '$responseDetails.agreedToResearch',
        'Survey Type': '$surveyType',
        'Trainer 1 ID': { $arrayElemAt: ['$trainers._id', 0] },
        'Trainer 1 Name': { $arrayElemAt: ['$trainers.name', 0] },
        'Trainer 1 Email': { $arrayElemAt: ['$trainers.email', 0] },
        'Trainer 2 ID': { $arrayElemAt: ['$trainers._id', 1] },
        'Trainer 2 Name': { $arrayElemAt: ['$trainers.name', 1] },
        'Trainer 2 Email': { $arrayElemAt: ['$trainers.email', 1] },
        'answers._id': 1,
        'answers.answer': 1,
        'answers.question.text': 1,
        'answers.question.group.text': 1,
        'answers.question.subGroup': 1,
      },
    },
  ]);
};
