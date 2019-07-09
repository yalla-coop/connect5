const Participant = require('../../models/Participant');

const { questionConstants } = require('./../../DBConstants');

module.exports = async () => {
  const participants = [
    {
      PIN: 'RAM14',
      age: questionConstants.ages[0],
      gender: 'male',
      ethinc: 'Irish',
      region: questionConstants.regions[0],
      postcode: 'SE520',
      Session1Date: Date.now(),
      occupation: 'policeman',
      workforce: 'Emergency services',
    },
    {
      PIN: 'HIO13',
      age: questionConstants.ages[1],
      gender: 'female',
      ethinc: 'English',
      region: questionConstants.regions[1],
      postcode: 'GH585',
      Session1Date: Date.now() - 24 * 60 * 60 * 1000,
      occupation: 'doctor',
      workforce: 'Teaching and educational',
    },
    {
      PIN: 'MAD20',
      age: questionConstants.ages[2],
      gender: 'female',
      ethinc: 'English',
      region: questionConstants.regions[2],
      postcode: 'FE324',
      Session1Date: Date.now(),
      occupation: 'doctor',
      workforce: 'Teaching and educational',
    },
  ];
  return Participant.create(participants);
};
