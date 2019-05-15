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

  const localLeads = [
    {
      name: 'nisha',
      email: 'nisha.sharma@phe.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'PHE (public health england)',
      region: regions[7],
    },
    {
      name: 'tez',
      email: 'tez.cook@hants.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'Hampshire council',
      region: regions[7],
    },
    {
      name: 'sara',
      email: 'sara.moreland@medway.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'Medway council',
      region: regions[7],
    },
    {
      name: 'jane',
      email: 'jane.Leech@portsmouthcc.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'Portsmouth council',
      region: regions[7],
    },
    {
      name: 'deborah',
      email: 'deborah.Lear@phe.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'HEE',
      region: regions[8],
    },
    {
      name: 'martin',
      email: 'martin.r.white@phe.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'PHE',
      region: regions[8],
    },
    {
      name: 'julie',
      email: 'julie.daneshyar@phe.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'PHE',
      region: regions[7],
    },
    {
      name: 'clare',
      email: 'Clare.Baguley@hee.nhs.uk',
      password: '123456',
      role: 'localLead',
      organization: 'HEE',
      region: regions[0],
    },
    {
      name: 'andra',
      email: 'Andra.Chiscop@hee.nhs.uk',
      password: '123456',
      role: 'localLead',
      organization: 'HEE',
      region: regions[0],
    },
  ];

  const storedLocalLeads = await User.create(localLeads);

  const trianers = [
    // Group 1
    {
      name: 'alex',
      email: 'alex@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[0],
      localLead: storedLocalLeads[0],
    },
    {
      name: 'mark',
      email: 'mark@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[0],
      localLead: storedLocalLeads[0],
    },
    {
      name: 'john',
      email: 'john@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[1],
      localLead: storedLocalLeads[0],
    },
    // Group 2
    {
      name: 'nadia',
      email: 'nadia@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[1],
      localLead: storedLocalLeads[1],
    },
    {
      name: 'sozan',
      email: 'sozan@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[1],
      localLead: storedLocalLeads[1],
    },
    {
      name: 'anne',
      email: 'anne@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[2],
      localLead: storedLocalLeads[1],
    },
    // Group 3
    {
      name: 'max',
      email: 'max@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[2],
      localLead: storedLocalLeads[2],
    },
    {
      name: 'matt',
      email: 'matt@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[2],
      localLead: storedLocalLeads[2],
    },
    {
      name: 'tom',
      email: 'tom@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[0],
      localLead: storedLocalLeads[2],
    },
    {
      name: 'joncy',
      email: 'joncy@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[0],
      localLead: storedLocalLeads[2],
    },
  ];

  return User.create(trianers);
};
