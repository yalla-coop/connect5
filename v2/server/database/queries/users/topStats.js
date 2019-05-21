const mongoose = require('mongoose');

const Session = require('../../models/Session');
const Response = require('../../models/Response');
const User = require('../../models/User');

const {
  getTrainerSessionCount,
  getTrainerResponseCount,
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
    const participantCount = await Response.aggregate([
      {
        $group: {
          _id: '$PIN',
        },
      },
    ]);

    stats = {
      sessionCount: sessionCount.length,
      responseCount: responseCount.length,
      trainerCount: trainerCount.length,
      participantCount: participantCount.length,
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

    // get unique sessions as you might have two trainers in the group on the same session
    const uniqueSessions =
      sessions.length > 0
        ? Array.from(new Set(sessions[0].map(object => object._id))).map(id => {
            return {
              _id: id,
              numberOfAttendees: sessions[0].find(object => object._id === id)
                .numberOfAttendees,
            };
          })
        : [];

    // get the unique responses as you might have two trainers in the group on the same session that they are responding to
    const uniqueResponses =
      responses.length > 0
        ? [...new Set(responses[0].map(response => response._id))]
        : [];

    const participantCount = uniqueSessions
      .map(session => session.numberOfAttendees)
      .reduce((a, b) => a + b, 0);

    stats = {
      sessionCount: uniqueSessions.length,
      responseCount: uniqueResponses.length,
      trainerCount: trainers.length,
      participantCount,
    };
  } else {
    // this defaults to it being the trainer
    const sessions = await getTrainerSessionCount(userId);
    const responses = await getTrainerResponseCount(userId);

    let sessionCount = 0;
    let participantCount = 0;
    let responseCount = 0;

    if (typeof sessions[0] === 'object') {
      sessionCount = sessions[0].sessions;
      participantCount = sessions[0].participants;
    }

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
