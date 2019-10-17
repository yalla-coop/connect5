const User = require('../../models/User');
const { regions } = require('../../DBConstants');

module.exports = async () => {
  const admin = {
    name: 'elysabeth',
    email: 'elysabeth@connect5.com',
    password: '123456',
    role: 'admin',
  };

  await User.create(admin);

  // initially create the localLeads
  const localLeads = [
    {
      name: 'nisha',
      email: 'nisha.sharma@phe.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'PHE (public health england)',
      region: regions[7],
      officialLocalLead: true,
    },
    {
      name: 'tez',
      email: 'tez.cook@hants.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'Hampshire council',
      region: regions[7],
      officialLocalLead: false,
    },
    {
      name: 'sara',
      email: 'sara.moreland@medway.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'Medway council',
      region: regions[7],
      officialLocalLead: false,
    },
    {
      name: 'jane',
      email: 'jane.Leech@portsmouthcc.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'Portsmouth council',
      region: regions[7],
      officialLocalLead: true,
    },
    {
      name: 'deborah',
      email: 'deborah.Lear@phe.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'HEE',
      region: regions[8],
      officialLocalLead: false,
    },
    {
      name: 'martin',
      email: 'martin.r.white@phe.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'PHE',
      region: regions[8],
      officialLocalLead: false,
    },
    {
      name: 'julie',
      email: 'julie.daneshyar@phe.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'PHE',
      region: regions[7],
      officialLocalLead: false,
    },
    {
      name: 'clare',
      email: 'Clare.Baguley@hee.nhs.uk',
      password: '123456',
      role: 'localLead',
      organization: 'HEE',
      region: regions[0],
      officialLocalLead: false,
    },
    {
      name: 'andra',
      email: 'Andra.Chiscop@hee.nhs.uk',
      password: '123456',
      role: 'localLead',
      organization: 'HEE',
      region: regions[0],
      officialLocalLead: true,
    },
  ];

  const storedLocalLeads = await User.create(localLeads);

  // create the trainers
  const trianers = [
    {
      name: 'alex',
      email: 'alex@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[0],
      localLead: storedLocalLeads[0],
      managers: [storedLocalLeads[0], storedLocalLeads[1]],
      officialLocalLead: false,
    },
    {
      name: 'mark',
      email: 'mark@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[0],
      localLead: storedLocalLeads[0],
      managers: [storedLocalLeads[0], storedLocalLeads[1]],
      officialLocalLead: false,
    },
    {
      name: 'john',
      email: 'john@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[1],
      localLead: storedLocalLeads[0],
      managers: [storedLocalLeads[0], storedLocalLeads[1]],
      officialLocalLead: false,
    },
    {
      name: 'nadia',
      email: 'nadia@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[1],
      localLead: storedLocalLeads[1],
      managers: [storedLocalLeads[0], storedLocalLeads[1]],
      officialLocalLead: false,
    },
    {
      name: 'sozan',
      email: 'sozan@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[1],
      localLead: storedLocalLeads[1],
      officialLocalLead: false,
    },
    {
      name: 'anne',
      email: 'anne@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[2],

      localLead: storedLocalLeads[1],
      officialLocalLead: false,
    },
    {
      name: 'max',
      email: 'max@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[2],
      localLead: storedLocalLeads[2],
      officialLocalLead: false,
    },
    {
      name: 'matt',
      email: 'matt@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[2],
      localLead: storedLocalLeads[2],
      officialLocalLead: false,
    },
    {
      name: 'tom',
      email: 'tom@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[0],
      localLead: storedLocalLeads[2],
      officialLocalLead: false,
    },
    {
      name: 'joncy',
      email: 'joncy@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[0],
      localLead: storedLocalLeads[2],
      officialLocalLead: false,
    },
  ];

  await User.create(trianers);

  // update the 3 local leads with trainers on the platform

  const trainers = await User.find({ role: 'trainer' });

  await User.findByIdAndUpdate(storedLocalLeads[0].id, {
    trainersGroup: [trainers[0], trainers[1], trainers[2], storedLocalLeads[0]],
  });

  await User.findByIdAndUpdate(storedLocalLeads[1].id, {
    trainersGroup: [trainers[3], trainers[4], trainers[5], storedLocalLeads[1]],
  });

  await User.findByIdAndUpdate(storedLocalLeads[2].id, {
    trainersGroup: [trainers[6], trainers[7], trainers[8], storedLocalLeads[2]],
  });

  return 'completed';
};
