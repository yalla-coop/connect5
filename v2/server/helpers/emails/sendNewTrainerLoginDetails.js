const mailer = require('./index');

const sendNewTrainerLoginDetails = (username, userEmail, password) => {
  const html = `
  <div style="text-align: center;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <div style="text-align: left;">
      <p style="font-weight: 700;">Hi, <span style="font-weight: 900;  text-transform: capitalize;"> ${username}</span></p>
      <p>You have been added as trainer to connect 5</p>
      <p>Here is your password, ${password}</p>
      <p>You can reset your password </p>

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

module.exports = sendNewTrainerLoginDetails;
