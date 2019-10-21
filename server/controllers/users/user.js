/* eslint-disable no-param-reassign */
const boom = require('boom');

const filterSession = require('../../database/queries/users/filterSession');
const filterSurveys = require('../../database/queries/users/filterSurveys');

const User = require('../../database/models/User');

const { getMyTrainers } = require('../../database/queries/users/loaclLead');

const {
  getAllTrainers,
  getAllLocalLeads,
} = require('../../database/queries/users/admin');

const { getRegistrationDate } = require('../../database/queries/users');

const getResponseRate = require('../../helpers/getResponseRate');

// get the logged in user results
const getUserResults = async (req, res, next) => {
  const { id, filters = {} } = req.body;

  try {
    if (id) {
      const user = await User.findById(id);
      if (!user) {
        return next(boom.notFound('User not found'));
      }
    }

    const sessions = await filterSession(filters);

    const surveys = await filterSurveys(filters);

    // calc the responseRate and add it to the surveys object
    const newSurveys = getResponseRate(sessions, surveys);

    // get when the user registered an account
    const registrationDate = await getRegistrationDate(id);

    sessions.forEach(session => {
      const confirmedEmails = [];
      session.emails.forEach(emailGroup => {
        emailGroup
          .filter(email => email.status === 'confirmed')
          .map(email => confirmedEmails.push(email));
      });
      session.confirmedParticipants = confirmedEmails.length;
    });

    const results = { sessions, newSurveys, registrationDate };
    return res.json(results);
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

const getListOfTrainers = async (req, res, next) => {
  const { user } = req;

  try {
    const trainers = await getMyTrainers(user.id);
    const cleanedTrainers = trainers.map(trainer => trainer[0]);
    return res
      .status(200)
      .json({ trainerCount: trainers.length, trainerList: cleanedTrainers });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

const getLocalLeadsTrainerList = async (req, res, next) => {
  const { localLeadID } = req.body;

  try {
    const trainers = await getMyTrainers(localLeadID);
    const cleanedTrainers = trainers.map(trainer => trainer[0]);
    return res
      .status(200)
      .json({ trainerCount: trainers.length, trainerList: cleanedTrainers });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

const getLocalLeadDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    const localLead = await User.findById(id);
    const localLeadDetails = {
      name: localLead.name,
      organization: localLead.organization,
    };
    return res.status(200).json(localLeadDetails);
  } catch (err) {
    return next(boom.badImplementation(err));
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
    return next(boom.badImplementation(err));
  }
};

module.exports = {
  getUserResults,
  getListOfTrainers,
  getLocalLeadsTrainerList,
  getAllTrainersAndLeads,
  getLocalLeadDetails,
};
