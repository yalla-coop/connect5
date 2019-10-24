/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');

const Session = require('../../models/Session');
const Response = require('../../models/Response');
const User = require('../../models/User');

const {
  getTrainerResponseCount,
  getTrainerSessions,
} = require('./trainerResults');

//  query  to get the top line stats that are sent to the dashboard

const getTopStats = async (userId, userType) => {
  // if admin we want all sessions, participants, responses and trainers
  // if local lead we want above but filtered for them
  // if trainer we want just their sessions and participants

  let stats = {};
  const user = await User.findById(userId);

  // admin
  if (userType === 'admin') {
    const sessionCount = await Session.find();
    const responseCount = await Response.find();
    const trainerCount = await User.find({
      $or: [{ role: 'localLead' }, { role: 'trainer' }],
    });

    const allEmails = [];

    sessionCount.forEach(session =>
      session.participantsEmails
        .filter(email => email.status === 'confirmed')
        .map(email => allEmails.push(email))
    );

    stats = {
      sessionCount: sessionCount.length,
      responseCount: responseCount.length,
      trainerCount: trainerCount.length,
      participantCount: allEmails.length,
    };
  } else if (userType === 'localLead') {
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
              participantsEmails: 1,
            },
          },
        ])
      )
    );

    // get all the responses that include at least one trainer in the group
    const responses = await Promise.all(
      trainers.map(async trainerId =>
        Response.aggregate([
          { $match: { trainers: mongoose.Types.ObjectId(trainerId) } },
          {
            $project: {
              _id: 1,
            },
          },
        ])
      )
    );

    // put all the sessions into one array
    const cleanedSessions = sessions.reduce((a, b) => a.concat(b), []);

    // get unique sessions as you might have two trainers in the group on the same session
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
            participantsEmails: item.participantsEmails,
          });
        }
      }
    }

    const cleanedResponses = responses.reduce((a, b) => a.concat(b), []);

    // get the unique responses as you might have two trainers in the group on the same session that they are responding to
    const uniqueResponses = [];
    const responseMap = new Map();

    if (cleanedResponses.length > 0) {
      for (const item of cleanedResponses) {
        if (!responseMap.has(item._id.toString())) {
          responseMap.set(item._id.toString(), true);
          uniqueResponses.push({
            _id: item._id,
            surveyType: item.surveyType,
          });
        }
      }
    }

    const allEmails = [];

    uniqueSessions.forEach(session =>
      session.participantsEmails
        .filter(email => email.status === 'confirmed')
        .map(email => allEmails.push(email))
    );

    const participantCount = allEmails.length;

    stats = {
      sessionCount: uniqueSessions.length,
      responseCount: uniqueResponses.length,
      trainerCount: trainers.length,
      participantCount,
    };
  } else {
    // this defaults to it being the trainer
    const responses = await getTrainerResponseCount(userId);

    let responseCount = 0;

    const fullSessions = await getTrainerSessions(userId);

    const confirmedParticipants = [];

    fullSessions.forEach(session =>
      session.participantsEmails
        .filter(email => email.status === 'confirmed')
        .map(email => confirmedParticipants.push(email))
    );

    const participantCount = confirmedParticipants.length;
    const sessionCount = fullSessions.length;

    if (typeof responses[0] === 'object')
      responseCount = responses[0].responses;

    const responseRate = Math.ceil((responseCount / participantCount) * 100);

    stats = {
      sessionCount,
      responseCount,
      participantCount,
      responseRate,
    };
  }

  return stats;
};

module.exports = getTopStats;
