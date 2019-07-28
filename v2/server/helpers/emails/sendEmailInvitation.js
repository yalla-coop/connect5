const mailer = require('./index');

const sendEmailInvitation = ({
  name,
  participantsEmails,
  sessionDate,
  type,
  trainerName,
  region,
  startTime,
  endTime,
  shortId,
}) => {
  const registrationURL = `${process.env.DOMAIN}/confirm/${shortId}`;
  const html = `
  <div style="text-align: left;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <p>Dear course participants,</p>

    <p>${name} has invited you to register for an upcoming Connect 5 training session.</p>
    <ul style="list-style: none;">
      <li>- session date: ${sessionDate}</li>
      <li>- session type: ${type}</li>
      <li>- region: ${region}</li>
      <li>- time: ${startTime} to ${endTime}</li>
      <li>- trainers: ${trainerName}</li>
    </ul>
    <p>To confirm your attendance please click this link: ${registrationURL}</p>

    <p>Sincerely,</p>

    <p>your Connect 5 team.</p>
  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = 'Invitation';
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
    to: participantsEmails,
    subject,
    html,
    user,
    pass,
    attachments,
  });
};

module.exports = sendEmailInvitation;
