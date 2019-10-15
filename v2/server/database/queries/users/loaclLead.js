const mongoose = require('mongoose');

const User = require('../../models/User');
const Session = require('../../models/Session');
const Response = require('../../models/Response');
const {
  readableSurveysNamePairs,
  readableSessionNamePairs,
} = require('./../../../constants');

const getTrainerGroupSurveys = async leadId => {
  // array of branches
  // { case: { $eq: ['$surveyType', 'post-day-1'] },    then: 'Post Session 1' },
  const branches = Object.entries(readableSurveysNamePairs).map(pair => {
    return {
      case: { $eq: ['$surveyType', pair[0]] },
      then: pair[1],
    };
  });

  const responses = await Response.aggregate([
    {
      $lookup: {
        from: 'sessions',
        let: { sessionId: '$session' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$_id', '$$sessionId'] },
                  {
                    $in: [mongoose.Types.ObjectId(leadId), '$canAccessResults'],
                  },
                ],
              },
            },
          },
        ],
        as: 'session',
      },
    },
    {
      $unwind: '$session',
    },
    {
      $project: {
        _id: 1,
        surveyType: 1,
        participants: '$session.numberOfAttendees',
      },
    },
    {
      $group: {
        _id: '$surveyType',
        responses: { $sum: 1 },
        participants: { $sum: '$participants' },
        type: {
          $first: {
            $switch: {
              branches,
              default: 'No match',
            },
          },
        },
      },
    },
  ]);

  const result = {};
  Object.entries(readableSurveysNamePairs).forEach(pair => {
    result[pair[0]] = {
      _id: pair[0],
      responses: 0,
      participants: 0,
      type: pair[1],
    };
  });

  responses.forEach(response => {
    if (result[response.surveyType]) {
      result[response.surveyType]._id = response.surveyType;
      result[response.surveyType].responses = response.surveyType;
      result[response.surveyType].participants = response.participants;
    }
  });

  return Object.values(result);
};

const getTrainerGroupSessions = async leadId => {
  // array of branches
  // [ { case: { $eq: ['$type', '1'] }, then: 'Session 1' }, ... ]
  const branches = Object.entries(readableSessionNamePairs).map(pair => {
    return { case: { $eq: ['$type', pair[0]] }, then: pair[1] };
  });

  console.log('reached');
  const sessions = await Session.aggregate([
    { $match: { canAccessResults: mongoose.Types.ObjectId(leadId) } },
    {
      $project: {
        _id: 1,
        numberOfAttendees: 1,
        type: 1,
      },
    },
    {
      $group: {
        _id: '$type',
        participants: { $sum: '$numberOfAttendees' },
        sessions: { $sum: 1 },
        emails: { $push: '$participantsEmails' },
        type: {
          $first: {
            $switch: {
              branches,
              default: 'No match',
            },
          },
        },
      },
    },
  ]);
  const result = {};
  Object.entries(readableSessionNamePairs).forEach(pair => {
    result[pair[0]] = {
      _id: pair[0],
      sessions: 0,
      participants: 0,
      type: pair[1],
      emails: [],
    };
  });

  sessions.forEach(session => {
    if (result[session._id]) {
      result[session._id]._id = session._id;
      result[session._id].sessions = session.sessions;
      result[session._id].participants = session.participants;
      result[session._id].emails = session.emails;
    }
  });

  return Object.values(result);
};

const getMyTrainers = async leadId => {
  const userDetails = await User.findById(leadId);

  if (userDetails.trainersGroup.length > 0) {
    const trainers = await Promise.all(
      // map through the trainerGroup array to look up each trainer
      userDetails.trainersGroup.map(async trainerId =>
        User.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(trainerId),
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'localLead',
              foreignField: '_id',
              as: 'localLead',
            },
          },
          {
            $unwind: { path: '$localLead', preserveNullAndEmptyArrays: true },
          },
          {
            $addFields: {
              localLeadName: '$localLead.name',
            },
          },
          {
            $project: {
              _id: 1,
              email: 1,
              localLeadName: 1,
              name: 1,
              region: 1,
              organization: 1,
              role: 1,
            },
          },
        ])
      )
    );

    return trainers;
  }

  return [];
};

module.exports = {
  getMyTrainers,
  getTrainerGroupSessions,
  getTrainerGroupSurveys,
};
