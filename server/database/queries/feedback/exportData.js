// ADMIN - all data
// TRAINER - all data for them
// LOCAL LEAD -- all data for their trainer group

const Answer = require('../../models/Answer');

module.exports.exportData = () =>
  Answer.aggregate([
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
      $lookup: {
        from: 'users',
        localField: 'responseDetails.trainers',
        foreignField: '_id',
        as: 'trainers',
      },
    },
    {
      $project: {
        _id: 1,
        'Participant PIN': '$participant.PIN',
        'Participant Age': '$participant.age',
        'Participant Gender': '$participant.gender',
        'Participant Region': '$participant.region',
        'Participant Ethnicity': '$participant.ethinc',
        'Participant Occupation': '$participant.occupation',
        'Participant Workforce': '$participant.workforce',
        'Session Date': '$session.date',
        'Session Type': '$session.type',
        'Session Region': '$session.region',
        'Agreed to Research': '$responseDetails.agreedToResearch',
        'Survey Type': '$responseDetails.surveyType',
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

module.exports.trainerFilter = (responses, trainerIDs) => {
  // expects array of responses from the export data func above and an array of trainer ID(s)

  // filters to only return responses that involve those trainers
  const filteredResponses = responses.filter(response => {
    return (
      trainerIDs.includes(String(response['Trainer 1 ID'])) ||
      trainerIDs.includes(String(response['Trainer 2 ID']))
    );
  });

  return filteredResponses;
};
