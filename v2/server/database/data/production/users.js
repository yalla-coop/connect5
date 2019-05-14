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

  return User.create(localLeads);
};
