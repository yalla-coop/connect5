/* eslint-disable no-param-reassign */
const boom = require('boom');
const mongoose = require('mongoose');

const User = require('../../database/models/User');

const {
  getTrainerGroupSessions,
  getTrainerGroupSurveys,
  getLocalLeadsSessions,
  getTeamLeadSuerveys,
  getMyTrainers,
} = require('../../database/queries/users/loaclLead');

const {
  getAdminSessions,
  getAdminSuerveys,
  getAllTrainers,
  getAllLocalLeads,
} = require('../../database/queries/users/admin');

const {
  getTrianerSessions,
  getTrainerSuerveys,
} = require('../../database/queries/users/trainerResults');

const { getRegistrationDate } = require('../../database/queries/users');

const getResponseRate = require('../../helpers/getResponseRate');

// get the logged in user results
const getUserResults = async (req, res, next) => {
  // const { id } = req.params;

  // const { id } = req.user;
  const { role, id } = req.body;

  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) {
    return next(boom.badData('your data is bad and you should feel bad'));
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return next(boom.notFound('User not found'));
    }
    // const { role } = user;

    let sessions;
    let surveys;

    switch (role) {
      case 'localLead':
        sessions = await getTrainerGroupSessions(id);
        surveys = await getTrainerGroupSurveys(id);
        break;
      case 'admin':
        sessions = await getAdminSessions(id);
        surveys = await getAdminSuerveys(id);
        break;

      default:
        sessions = await getTrianerSessions(id);
        surveys = await getTrainerSuerveys(id);
        break;
    }

    // calc the responseRate and add it to the surveys object
    const newSurveys = getResponseRate(sessions, surveys);

    // get when the user registered an account
    const registrationDate = await getRegistrationDate(id);

    const results = { sessions, newSurveys, registrationDate };
    return res.json(results);
  } catch (err) {
    return next(boom.badImplementation('Internal server error'));
  }
};

const getListOfTrainers = async (req, res, next) => {
  // this is temp until log in is in place
  // const user = await User.findOne({ name: 'nisha' });

  const { user } = req;

  try {
    const trainers = await getMyTrainers(user.id);
    const cleanedTrainers = trainers.map(trainer => trainer[0]);
    return res
      .status(200)
      .json({ trainerCount: trainers.length, trainerList: cleanedTrainers });
  } catch (err) {
    return next(boom.badImplementation('Internal server error'));
  }
};

const getAllTrainersAndLeads = async (req, res, next) => {
  // NEED TO MAKE SURE WE PUT THIS THROUGH AUTH SO ONLY ADMIN CAN ACCESS
  const { user } = req;

  if (user.role !== 'admin')
    return next(boom.unauthorized('Do not have admin rights'));

  try {
    const trainers = await getAllTrainers();
    const localLeads = await getAllLocalLeads();
    return res.status(200).json({
      trainerCount: trainers.length,
      localLeadCount: localLeads.length,
      trainerList: trainers,
      localLeadList: localLeads,
    });
  } catch (err) {
    return next(boom.badImplementation('Internal server error'));
  }
};

module.exports = { getUserResults, getListOfTrainers, getAllTrainersAndLeads };
