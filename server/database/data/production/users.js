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

  const dummyLeads = [
    {
      name: 'tez',
      email: 'tez.cook@hants.gov.uk',
      password: '123456',
      role: 'localLead',
      organization: 'Hampshire council',
      region: regions[7],
      officialLocalLead: true,
    },
    {
      name: 'andra',
      email: 'Andra.Chiscop@hee.nhs.uk',
      password: '123456',
      role: 'localLead',
      organization: 'HEE',
      region: regions[0],
      officialLocalLead: false,
    },
  ];

  const storedLocalLeads = await User.create(dummyLeads);

  const dummyTrainers = [
    {
      name: 'alex',
      email: 'alex@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[0],
      localLead: storedLocalLeads[0],
      officialLocalLead: false,
      managers: [storedLocalLeads[0]],
    },
    {
      name: 'mark',
      email: 'mark@connect5.uk',
      password: '123456',
      role: 'trainer',
      region: regions[0],
      localLead: storedLocalLeads[0],
      officialLocalLead: false,
      managers: [storedLocalLeads[0]],
    },
  ];
  const trainers = await User.create(dummyTrainers);

  const trainersIds = trainers.map(item => item._id);
  const Tez = await User.findOne({ email: 'tez.cook@hants.gov.uk' });

  await User.updateOne(
    { email: 'tez.cook@hants.gov.uk' },
    { trainersGroup: [...trainersIds, Tez._id] }
  );
};
