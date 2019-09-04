const mailer = require('./index');

const sendRegisteredTranierEmail = (userEmail, name, localLeadName) => {
  const html = `
  <div style="text-align: center;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <div style="text-align: left;">
        <p>
        Hi <span style="text-transform: capitalize">${name}</sapn>
        </p>
        <p>
        You have been added to <span style="text-transform: capitalize">${localLeadName}'s</sapn> group.
        </p>

       <p style="margin-bottom: 0;">Thanks,</p>
      <p style="margin-bottom: 0;">Connect 5</p>
    </div>
  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = 'your password';
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
    to: userEmail,
    subject,
    html,
    user,
    pass,
    attachments,
  });
};

module.exports = sendRegisteredTranierEmail;
