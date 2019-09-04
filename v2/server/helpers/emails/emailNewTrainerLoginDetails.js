const mailer = require('./index');

const sendNewTrainerLoginDetails = (
  username,
  userEmail,
  password,
  localLeadName,
  localLeadRegion
) => {
  const loginLink = `${process.env.DOMAIN}/login`;

  const html = `
  <div style="text-align: center;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <div style="text-align: left;">
      <p style="font-weight: 700;">Hi, <span style="font-weight: 900;  text-transform: capitalize;"> ${username}</span></p>
      <p><span style="text-transform: capitalize">${localLeadName}</span> :${localLeadRegion} has added you to his/her group as a trainer,
         By proceeding you confirm that your local lead can view your profile data
         as well as individual feedback data given by course participants.
         If you do not agree or if there appears to be an error please contact us directly.
      </p>
      <p>Here is your password, ${password}</p>
      <p>You can now log in using this email address and your password. Once logged in you can change your password.</p>

      <a href="${loginLink}">Log in Now</a>

       <p style="margin-bottom: 0;">Thanks,</p>
      <p style="margin-bottom: 0;">Connect 5</p>
    </div>
  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = 'Your password';
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
