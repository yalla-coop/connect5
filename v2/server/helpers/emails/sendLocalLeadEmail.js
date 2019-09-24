const mailer = require('./index');

const sendLocalLeadEmail = (localLeadName, email, trainerName, status) => {
  const html = `
  <div style="text-align: center;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <div style="text-align: left;">
      <p style="font-weight: 700;">Dear, <span style="font-weight: 900;  text-transform: capitalize;"> ${localLeadName}</span></p>
      <p>Trainer <span style="text-transform: capitalize">${trainerName}</span> has <span> ${
    status === 'old' ? 'removed' : 'added'
  }</span> you as their official Connect 5 local lead.</p>

  <p>If this doesn't seem correct please contact this trainer directly.</p>
  <p>Note: You can always edit trainer group management settings via the app.</p>
  <p>Best wishes,</p>
  <p>Connect 5 team</p>
  </div>
  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = '';
  const from = 'Connect 5';

  const attachments = [
    {
      filename: 'logo.png',
      path: `${__dirname}/../../assets/connect-5-white.png`,
      cid: 'connect5-logo',
    },
  ];

  return mailer({
    from,
    to: email,
    subject,
    html,
    user,
    pass,
    attachments,
  });
};

module.exports = sendLocalLeadEmail;
