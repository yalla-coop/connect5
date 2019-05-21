const Response = require('./../../models/Response');
const Session = require('./../../models/Session');
const User = require('./../../models/User');

const { sessionTypes, surveyTypes } = require('./../../DBConstants');

module.exports = async () => {
  const type1Session = await Session.findOne({ type: sessionTypes[0] });
  const trainTrainersSession = await Session.findOne({
    type: sessionTypes[4],
  });

  const trainers = await User.find({ role: 'trainer' });
  const localLead = await User.findOne({ role: 'localLead' });

  const responses = [
    // type 1 session
    {
      PIN: 'HIO13',
      trainers: [trainers[0], trainers[1]],
      surveyType: 'pre-day-1',
      session: type1Session,
    },
    {
      PIN: 'RAM14',
      trainers: [trainers[0], trainers[1]],
      surveyType: 'pre-day-1',
      session: type1Session,
    },
    // train-trainers session
    {
      PIN: 'PIV15',
      trainers: [localLead],
      surveyType: surveyTypes[5],
      session: trainTrainersSession,
    },
    {
      PIN: 'SLU23',
      trainers: [localLead],
      surveyType: surveyTypes[5],
      session: trainTrainersSession,
    },

    // more stuff
    {
      PIN: 'AIO13',
      trainers: [trainers[0], trainers[1]],
      surveyType: 'pre-day-1',
      session: type1Session,
    },
    {
      PIN: 'FAM14',
      trainers: [trainers[0], trainers[1]],
      surveyType: 'pre-day-1',
      session: type1Session,
    },
    {
      PIN: 'FAM14',
      trainers: [trainers[0], trainers[1]],
      surveyType: 'pre-day-1',
      session: type1Session,
    },
  ];

  return Response.create(responses);
};
