const User = require('../../models/User');
const Session = require('../../models/Session');

module.exports = async () => {
  const trainers = await User.find({ role: 'trainer' });
  const localLeads = await User.find({ role: 'localLead' });

  const sessions = [
    // trainers only sessions
    {
      date: '2019-05-14',
      type: '1',
      numberOfAttendees: 10,
      region: 'North East',
      trainers: [trainers[0], trainers[1]],
      participantsEmails: [
        'ramy@gmail.com',
        'abd@gmail.com',
        'marwa@gmail.com',
        'joe@gmail.com',
        'simon@gmail.com',
      ],
    },
    {
      date: '2019-05-15',
      type: '2',
      numberOfAttendees: 8,
      region: 'North East',
      trainers: [trainers[0]],
      participantsEmails: [
        'alex@gmail.com',
        'nancy@gmail.com',
        'mark@gmail.com',
        'john@gmail.com',
      ],
    },
    {
      date: '2019-05-17',
      type: '3',
      numberOfAttendees: 12,
      region: 'North East',
      trainers: [trainers[1]],
      participantsEmails: [
        'sozan@gmail.com',
        'amal@gmail.com',
        'mai@gmail.com',
        'bakeza@gmail.com',
      ],
    },
    // local lead only session
    // train-trainers session => for trainers
    {
      date: '2019-05-16',
      type: 'train-trainers',
      numberOfAttendees: 5,
      region: 'North West',
      trainers: [localLeads[0]],
      participantsEmails: [
        'nichole@gmail.com',
        'amal@gmail.com',
        'nancy@gmail.com',
        'bakeza@gmail.com',
      ],
    },
    // special-2-days session => for normal users
    {
      date: '2019-05-20',
      type: 'special-2-days',
      numberOfAttendees: 7,
      region: 'North West',
      trainers: [localLeads[0]],
      participantsEmails: [
        'ramy@gmail.com',
        'hosam@gmail.com',
        'sa3d@gmail.com',
        'saleem@gmail.com',
      ],
    },

    // local lead with trainer session
    {
      date: '2019-05-16',
      type: '3',
      numberOfAttendees: 5,
      region: 'North West',
      trainers: [localLeads[0], trainers[0]],
      participantsEmails: ['samer@gmail.com', 'nael@gmail.com'],
    },
  ];

  return Session.create(sessions);
};
