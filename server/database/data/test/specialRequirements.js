const SpecialRequirement = require('../../models/SpecialRequirement');
const Session = require('../../models/Session');

module.exports = async () => {
  const sessions = await Session.find();
  const specialRequirement = [
    {
      email: 'ramy@gmail.com',
      message:
        'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      session: sessions[0]._id,
    },
    {
      email: 'joseph.s.friel@gmail.com',
      message:
        'Here is a message outlining a number of requirements that I have for the workshop. This could be quite long so I think we give the opportunity to expand each message so they can initially get a sense of all the requirements at a quick glance and then expand the text to get more information.',
      session: sessions[0]._id,
    },
    {
      email: 'hosney@gmail.com',
      message: 'Just a short message, Thanks.',
      session: sessions[0]._id,
    },
    {
      email: 'simon@gmail.com',
      message:
        'ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.',
      session: sessions[1]._id,
    },
    {
      email: 'marwa@gmail.com',
      message:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laboru.',
      session: sessions[1]._id,
    },
    {
      email: 'abdalsamad@gmail.com',
      message:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laboru.',
      session: sessions[1]._id,
    },
  ];
  return SpecialRequirement.create(specialRequirement);
};
