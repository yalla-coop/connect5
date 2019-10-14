const shortid = require('shortid');
const User = require('./../../models/User');
const Session = require('./../../models/Session');

module.exports = async () => {
  const trainers = await User.find({ role: 'trainer' });
  const localLeads = await User.find({ role: 'localLead' });

  const sessions = [
    // trainers only sessions
    {
      date: '2019-05-14',
      type: '1',
      shortId: shortid.generate(),
      numberOfAttendees: 10,
      region: 'North East',
      address: '1 Test Street, Test City, TE 5TT',
      startTime: '14:00',
      endTime: '17:00',
      trainers: [trainers[0], trainers[1]],
      participantsEmails: [
        { email: 'ramy@gmail.com', status: 'new' },
        { email: 'abd@gmail.com', status: 'new' },
        { email: 'marwa@gmail.com', status: 'new' },
        { email: 'joe@gmail.com', status: 'new' },
        { email: 'simon@gmail.com', status: 'new' },
      ],
    },
    {
      date: '2019-03-14',
      type: '1',
      shortId: shortid.generate(),
      numberOfAttendees: 11,
      region: 'North East',
      trainers: [trainers[3], trainers[4]],
      participantsEmails: [
        { email: 'ramy@gmail.com', status: 'new' },
        { email: 'abd@gmail.com', status: 'new' },
        { email: 'marwa@gmail.com', status: 'new' },
        { email: 'joe@gmail.com', status: 'new' },
        { email: 'simon@gmail.com', status: 'new' },
      ],
    },
    {
      date: '2018-05-14',
      type: 'special-2-days',
      shortId: shortid.generate(),
      numberOfAttendees: 10,
      region: 'North East',
      address: '1 Test Street, Test City, TE 5TT',
      startTime: '14:00',
      endTime: '17:00',
      trainers: [trainers[0], trainers[2]],
      participantsEmails: [
        { email: 'ramy@gmail.com', status: 'new' },
        { email: 'abd@gmail.com', status: 'new' },
        { email: 'marwa@gmail.com', status: 'new' },
        { email: 'joe@gmail.com', status: 'new' },
        { email: 'simon@gmail.com', status: 'new' },
      ],
    },
    {
      date: '2019-2-14',
      type: '1',
      shortId: shortid.generate(),
      numberOfAttendees: 5,
      region: 'North East',
      trainers: [trainers[0]],
      participantsEmails: [
        { email: 'ramy@gmail.com', status: 'new' },
        { email: 'abd@gmail.com', status: 'new' },
        { email: 'marwa@gmail.com', status: 'new' },
        { email: 'joe@gmail.com', status: 'new' },
        { email: 'simon@gmail.com', status: 'new' },
      ],
    },
    {
      date: '2019-1-14',
      type: '1',
      shortId: shortid.generate(),
      numberOfAttendees: 7,
      region: 'North East',
      trainers: [trainers[0], trainers[2]],
      participantsEmails: [
        { email: 'ramy@gmail.com', status: 'new' },
        { email: 'abd@gmail.com', status: 'new' },
        { email: 'marwa@gmail.com', status: 'new' },
        { email: 'joe@gmail.com', status: 'new' },
        { email: 'simon@gmail.com', status: 'new' },
      ],
    },
    {
      date: '2019-05-15',
      type: '2',
      shortId: shortid.generate(),
      numberOfAttendees: 8,
      region: 'North East',
      trainers: [trainers[0]],
      participantsEmails: [
        { email: 'alex@gmail.com', status: 'new' },
        { email: 'nancy@gmail.com', status: 'new' },
        { email: 'mark@gmail.com', status: 'new' },
        { email: 'john@gmail.com', status: 'new' },
      ],
    },
    {
      date: '2018-07-15',
      type: '2',
      shortId: shortid.generate(),
      numberOfAttendees: 33,
      region: 'North East',
      trainers: [trainers[5]],
      participantsEmails: [
        { email: 'alex@gmail.com', status: 'new' },
        { email: 'nancy@gmail.com', status: 'new' },
        { email: 'mark@gmail.com', status: 'new' },
        { email: 'john@gmail.com', status: 'new' },
      ],
    },
    {
      date: '2019-05-17',
      type: '3',
      shortId: shortid.generate(),
      numberOfAttendees: 12,
      region: 'North East',
      trainers: [trainers[1]],
      participantsEmails: [
        { email: 'sozan@gmail.com', status: 'new' },
        { email: 'amal@gmail.com', status: 'new' },
        { email: 'mai@gmail.com', status: 'new' },
        { email: 'bakeza@gmail.com', status: 'new' },
      ],
    },
    // local lead only session
    // train-trainers-s1 session => for trainers
    {
      date: '2019-05-16',
      type: 'train-trainers-s1',
      shortId: shortid.generate(),
      numberOfAttendees: 5,
      region: 'North West',
      trainers: [localLeads[0]],
      participantsEmails: [
        { email: 'nichole@gmail.com', status: 'new' },
        { email: 'amal@gmail.com', status: 'new' },
        { email: 'nancy@gmail.com', status: 'new' },
        { email: 'bakeza@gmail.com', status: 'new' },
      ],
    },
    {
      date: '2019-04-16',
      type: 'train-trainers-s1',
      shortId: shortid.generate(),
      numberOfAttendees: 9,
      region: 'North West',
      trainers: [localLeads[1]],
      participantsEmails: [
        { email: 'nichole@gmail.com', status: 'new' },
        { email: 'amal@gmail.com', status: 'new' },
        { email: 'nancy@gmail.com', status: 'new' },
        { email: 'bakeza@gmail.com', status: 'new' },
      ],
    },
    // special-2-days session => for normal users
    {
      date: '2019-05-20',
      type: 'special-2-days',
      shortId: shortid.generate(),
      numberOfAttendees: 7,
      region: 'North West',
      trainers: [localLeads[0]],
      participantsEmails: [
        { email: 'ramy@gmail.com', status: 'new' },
        { email: 'hosam@gmail.com', status: 'new' },
        { email: 'sa3d@gmail.com', status: 'new' },
        { email: 'saleem@gmail.com', status: 'new' },
      ],
    },
    {
      date: '2019-01-20',
      type: 'special-2-days',
      shortId: shortid.generate(),
      numberOfAttendees: 40,
      region: 'North West',
      trainers: [localLeads[1]],
      participantsEmails: [
        { email: 'ramy@gmail.com', status: 'new' },
        { email: 'hosam@gmail.com', status: 'new' },
        { email: 'sa3d@gmail.com', status: 'new' },
        { email: 'saleem@gmail.com', status: 'new' },
      ],
    },

    // local lead with trainer session
    {
      date: '2019-05-16',
      type: '3',
      shortId: shortid.generate(),
      numberOfAttendees: 5,
      region: 'North West',
      trainers: [localLeads[0], trainers[0]],
      participantsEmails: [
        { email: 'samer@gmail.com', status: 'new' },
        { email: 'nael@gmail.com', status: 'new' },
      ],
    },
  ];

  return Session.create(sessions);
};
