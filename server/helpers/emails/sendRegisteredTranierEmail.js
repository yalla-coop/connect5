const mailer = require('./index');

const sendRegisteredTranierEmail = (userEmail, name, localLeadName) => {
  const email = process.env.EMAIL;
  const html = `
  <div style="text-align: center;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <div style="text-align: left;">
        <p>
        Dear <span style="text-transform: capitalize">${name}</sapn>
        </p>
        <p>
        This email is to notify you that you have been added to <span style="text-transform: capitalize">${localLeadName}'s</sapn> group.This means that they can set up Connect5 training sessions for you.
        </p>
        <p>
        At the moment they cannot see your results until you next use the Connect5 app.If any  of the information above looks incorrect then do not use the app and please contact us via ${email}.
        </p>

       <p style="margin-bottom: 0;">Best wishes,</p>
      <p style="margin-bottom: 0;"> The Connect5 Team</p>
    </div>
  </div>
`;

  const user = email;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = 'You have been added to localLead group on connect5';
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
