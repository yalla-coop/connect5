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

  // admin
  if (userType === 'admin') {
    const sessionCount = await Session.find();
    const responseCount = await Response.find();
    const trainerCount = await User.find();
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
    // get all the trainers who have them as a local lead
    const trainers = await User.find({
      localLead: mongoose.Types.ObjectId(userId),
    });

    let sessionCount = 0;
    let participantCount = 0;
    let responseCount = 0;

    // loop through each trainer and get their session and participant count
    // add it to the overall session and participant count
    await Promise.all(
      trainers.map(async trainer => {
        const session = await getTrainerSessionCount(trainer.id);
        const responses = await getTrainerResponseCount(trainer.id);
        if (typeof session[0] === 'object') {
          sessionCount += session[0].sessions;
          participantCount += session[0].participants;
        }
        if (typeof responses[0] === 'object') {
          responseCount += responses[0].responses;
        }
      })
    );

    stats = {
      sessionCount,
      responseCount,
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
