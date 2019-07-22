const mailer = require('./index');

const sendEmailInvitation = (
  name,
  recipients,
  sendingDate,
  date,
  type,
  trainerName,
  region
) => {
  console.log(name, recipients, sendingDate, date, type, trainerName, region);
  const html = `
  <div style="text-align: center;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <p>
      Date:
      <span style={{ marginLeft: '.5rem', color: '#4f4f4f' }}>
        ${sendingDate}
      </span>
    </p>

    <p>Message:</p>
    <p>Dear course participants,</p>

    <p>${name} has invited you to register for an upcoming Connect 5 training session.</p>
    <ul>
      <li>- ${date}</li>
      <li>- ${type}</li>
      <li>- ${region}</li>
      <li>- ${trainerName}</li>
    </ul>
    <p>To confirm your attendance please click this link: </p>

    <p>Sincerely,</p>

    <p>your Connect 5 team.</p>
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
    to: recipients,
    subject,
    html,
    user,
    pass,
    attachments,
  });
};

module.exports = sendEmailInvitation;
