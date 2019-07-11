const Participant = require('../../models/Participant');

const { questionConstants } = require('./../../DBConstants');

module.exports = async () => {
  const participants = [
    {
      PIN: 'HIO13',
      age: questionConstants.ages[0],
      gender: 'male',
      ethnic: 'Irish',
      region: questionConstants.regions[0],
      postcode: 'SE520',
      Session1Date: Date.now(),
      occupation: 'policeman',
      workforce: 'Emergency services',
    },
    {
      PIN: 'RAM14',
      age: questionConstants.ages[1],
      gender: 'female',
      ethnic: 'English',
      region: questionConstants.regions[1],
      postcode: 'GH585',
      Session1Date: Date.now() - 24 * 60 * 60 * 1000,
      occupation: 'doctor',
      workforce: 'Teaching and educational',
    },
    {
      PIN: 'RAM15',
      age: questionConstants.ages[2],
      gender: 'female',
      ethnic: 'English',
      region: questionConstants.regions[2],
      postcode: 'FE324',
      Session1Date: Date.now(),
      occupation: 'doctor',
      workforce: 'Teaching and educational',
    },
    {
      PIN: 'RAM16',
      age: questionConstants.ages[2],
      gender: 'female',
      ethnic: 'English',
      region: questionConstants.regions[2],
      postcode: 'FE324',
      Session1Date: Date.now(),
      occupation: 'doctor',
      workforce: 'Teaching and educational',
    },
    {
      PIN: 'RAM17',
      age: questionConstants.ages[2],
      gender: 'female',
      ethnic: 'English',
      region: questionConstants.regions[2],
      postcode: 'FE324',
      Session1Date: Date.now(),
      occupation: 'doctor',
      workforce: 'Teaching and educational',
    },
    {
      PIN: 'PIV15',
      age: questionConstants.ages[4],
      gender: 'female',
      ethnic: 'English',
      region: questionConstants.regions[4],
      postcode: 'FE324',
      Session1Date: Date.now(),
      occupation: 'engineer',
      workforce: 'Teaching and educational',
    },
    {
      PIN: 'SLU23',
      age: questionConstants.ages[5],
      gender: 'female',
      ethnic: 'English',
      region: questionConstants.regions[5],
      postcode: 'FE324',
      Session1Date: Date.now(),
      occupation: 'doctor',
      workforce: 'Teaching and educational',
    },
  ];
  return Participant.create(participants);
};