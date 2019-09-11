const mongoose = require('mongoose');

const User = require('../../models/User');
const Session = require('../../models/Session');
const Response = require('../../models/Response');
const {
  readableSurveysNamePairs,
  readableSessionNamePairs,
} = require('./../../../constants');

const getTrainerGroupSurveys = async leadId => {
  const user = await User.findById(leadId);
  const trainers = user.trainersGroup;

  // get all responses that include at least one trainer in the group
  const responses = await Promise.all(
    trainers.map(async trainerID =>
      Response.aggregate([
        { $match: { trainers: mongoose.Types.ObjectId(trainerID) } },
        {
          $lookup: {
            from: 'sessions',
            localField: 'session',
            foreignField: '_id',
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
            'session.numberOfAttendees': 1,
          },
        },
      ])
    )
  );

  const cleanedResponses = responses.reduce((a, b) => a.concat(b), []);
  const uniqueResponses = [];
  const map = new Map();

  if (cleanedResponses.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cleanedResponses) {
      if (!map.has(item._id.toString())) {
        map.set(item._id.toString(), true);
        uniqueResponses.push({
          _id: item._id,
          surveyType: item.surveyType,
          participants: item.session.numberOfAttendees,
        });
      }
    }
  }

  const result = {};
  Object.entries(readableSurveysNamePairs).forEach(pair => {
    result[pair[0]] = {
      _id: pair[0],
      responses: 0,
      participants: 0,
      type: pair[1],
    };
  });

  uniqueResponses.forEach(response => {
    result[response.surveyType]._id = response.surveyType;
    result[response.surveyType].responses += 1;
    result[response.surveyType].participants += response.participants;
  });

  return Object.values(result);
};

const getTrainerGroupSessions = async leadId => {
  const user = await User.findById(leadId);
  const trainers = user.trainersGroup;

  // get all the sessions that include at least one trainer in the group
  const sessions = await Promise.all(
    trainers.map(async trainerId =>
      Session.aggregate([
        { $match: { trainers: mongoose.Types.ObjectId(trainerId) } },
        {
          $project: {
            _id: 1,
            numberOfAttendees: 1,
            type: 1,
          },
        },
      ])
    )
  );

  const cleanedSessions = sessions.reduce((a, b) => a.concat(b), []);

  const uniqueSessions = [];
  const map = new Map();

  if (cleanedSessions.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cleanedSessions) {
      if (!map.has(item._id.toString())) {
        map.set(item._id.toString(), true);
        uniqueSessions.push({
          _id: item._id,
          numberOfAttendees: item.numberOfAttendees,
          type: item.type,
        });
      }
    }
  }

  const result = {};
  Object.entries(readableSessionNamePairs).forEach(pair => {
    result[pair[0]] = {
      _id: pair[0],
      sessions: 0,
      participants: 0,
      type: pair[1],
    };
  });

  uniqueSessions.forEach(session => {
    result[session.type]._id = session.type;
    result[session.type].sessions += 1;
    result[session.type].participants += session.numberOfAttendees;
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
              givenPermission: 1,
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
