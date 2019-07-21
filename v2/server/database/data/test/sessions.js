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
      trainers: [trainers[0], trainers[1]],
      participantsEmails: [
        { email: 'ramy@gmail.com', confirmed: false },
        { email: 'abd@gmail.com', confirmed: false },
        { email: 'marwa@gmail.com', confirmed: false },
        { email: 'joe@gmail.com', confirmed: false },
        { email: 'simon@gmail.com', confirmed: false },
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
        { email: 'ramy@gmail.com', confirmed: false },
        { email: 'abd@gmail.com', confirmed: false },
        { email: 'marwa@gmail.com', confirmed: false },
        { email: 'joe@gmail.com', confirmed: false },
        { email: 'simon@gmail.com', confirmed: false },
      ],
    },
    {
      date: '2018-05-14',
      type: 'special-2-days',
      shortId: shortid.generate(),
      numberOfAttendees: 10,
      region: 'North East',
      trainers: [trainers[0], trainers[2]],
      participantsEmails: [
        { email: 'ramy@gmail.com', confirmed: false },
        { email: 'abd@gmail.com', confirmed: false },
        { email: 'marwa@gmail.com', confirmed: false },
        { email: 'joe@gmail.com', confirmed: false },
        { email: 'simon@gmail.com', confirmed: false },
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
        { email: 'ramy@gmail.com', confirmed: false },
        { email: 'abd@gmail.com', confirmed: false },
        { email: 'marwa@gmail.com', confirmed: false },
        { email: 'joe@gmail.com', confirmed: false },
        { email: 'simon@gmail.com', confirmed: false },
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
        { email: 'ramy@gmail.com', confirmed: false },
        { email: 'abd@gmail.com', confirmed: false },
        { email: 'marwa@gmail.com', confirmed: false },
        { email: 'joe@gmail.com', confirmed: false },
        { email: 'simon@gmail.com', confirmed: false },
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
        { email: 'alex@gmail.com', confirmed: false },
        { email: 'nancy@gmail.com', confirmed: false },
        { email: 'mark@gmail.com', confirmed: false },
        { email: 'john@gmail.com', confirmed: false },
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
        { email: 'alex@gmail.com', confirmed: false },
        { email: 'nancy@gmail.com', confirmed: false },
        { email: 'mark@gmail.com', confirmed: false },
        { email: 'john@gmail.com', confirmed: false },
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
        { email: 'sozan@gmail.com', confirmed: false },
        { email: 'amal@gmail.com', confirmed: false },
        { email: 'mai@gmail.com', confirmed: false },
        { email: 'bakeza@gmail.com', confirmed: false },
      ],
    },
    // local lead only session
    // train-trainers session => for trainers
    {
      date: '2019-05-16',
      type: 'train-trainers',
      shortId: shortid.generate(),
      numberOfAttendees: 5,
      region: 'North West',
      trainers: [localLeads[0]],
      participantsEmails: [
        { email: 'nichole@gmail.com', confirmed: false },
        { email: 'amal@gmail.com', confirmed: false },
        { email: 'nancy@gmail.com', confirmed: false },
        { email: 'bakeza@gmail.com', confirmed: false },
      ],
    },
    {
      date: '2019-04-16',
      type: 'train-trainers',
      shortId: shortid.generate(),
      numberOfAttendees: 9,
      region: 'North West',
      trainers: [localLeads[1]],
      participantsEmails: [
        { email: 'nichole@gmail.com', confirmed: false },
        { email: 'amal@gmail.com', confirmed: false },
        { email: 'nancy@gmail.com', confirmed: false },
        { email: 'bakeza@gmail.com', confirmed: false },
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
        { email: 'ramy@gmail.com', confirmed: false },
        { email: 'hosam@gmail.com', confirmed: false },
        { email: 'sa3d@gmail.com', confirmed: false },
        { email: 'saleem@gmail.com', confirmed: false },
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
        { email: 'ramy@gmail.com', confirmed: false },
        { email: 'hosam@gmail.com', confirmed: false },
        { email: 'sa3d@gmail.com', confirmed: false },
        { email: 'saleem@gmail.com', confirmed: false },
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
        { email: 'samer@gmail.com', confirmed: false },
        { email: 'nael@gmail.com', confirmed: false },
      ],
    },
  ];

  return Session.create(sessions);
};
