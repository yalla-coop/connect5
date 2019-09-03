const mongoose = require('mongoose');

const User = require('../../models/User');
const Session = require('../../models/Session');
const Response = require('../../models/Response');

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

  const result = {
    'pre-day-1': {
      _id: 'pre-day-1',
      responses: 0,
      participants: 0,
      type: 'Pre-course',
    },
    'post-day-1': {
      _id: 'post-day-1',
      responses: 0,
      participants: 0,
      type: 'Post Session 1',
    },
    'post-day-2': {
      _id: 'post-day-2',
      responses: 0,
      participants: 0,
      type: 'Post Session 2',
    },
    'post-day-3': {
      _id: 'post-day-3',
      responses: 0,
      participants: 0,
      type: 'Post Session 3',
    },
    'pre-special': {
      _id: 'pre-special',
      responses: 0,
      participants: 0,
      type: 'Pre 2-day Intensive',
    },
    'post-special': {
      _id: 'post-special',
      responses: 0,
      participants: 0,
      type: 'Post 2-day Intensive',
    },
    'pre-train-trainers': {
      _id: 'pre-train-trainers',
      responses: 0,
      participants: 0,
      type: 'Pre train trainers',
    },
    'post-train-trainers': {
      _id: 'post-train-trainers',
      responses: 0,
      participants: 0,
      type: 'Post train trainers',
    },
    'follow-up-3-month': {
      _id: 'follow-up-3-month',
      responses: 0,
      participants: 0,
      type: '3 month follow-up',
    },
    'follow-up-6-month': {
      _id: 'follow-up-6-month',
      responses: 0,
      participants: 0,
      type: '6 month Follow-up',
    },
  };

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

  const result = {
    '1': { _id: '1', sessions: 0, participants: 0, type: 'Session 1' },
    '2': { _id: '2', sessions: 0, participants: 0, type: 'Session 2' },
    '3': { _id: '3', sessions: 0, participants: 0, type: 'Session 3' },
    'special-2-days': {
      _id: 'special-2-days',
      sessions: 0,
      participants: 0,
      type: '2-day intensive',
    },
    'train-trainers': {
      _id: 'train-trainers',
      sessions: 0,
      participants: 0,
      type: 'Train trainers',
    },
  };

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
