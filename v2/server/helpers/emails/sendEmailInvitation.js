const mailer = require('./index');

const sendEmailInvitation = ({
  name,
  emails,
  sessionDate,
  type,
  trainerName,
  startTime,
  endTime,
  shortId,
  address,
  region,
}) => {
  let fullAddress = '';

  if (address) {
    const { location, addressLine1, addressLine2 } = address;
    if (location || addressLine1 || addressLine2) {
      fullAddress = `${location}, ${addressLine1}, ${addressLine2}`;
    }
  }

  let emailsList = [];
  if (typeof emails[0] === 'string') {
    emailsList = emails;
  } else {
    emailsList = emails.map(email => email.email);
  }
  // const emailsList = emails.map(email => email.email);
  const registrationURL = `${process.env.DOMAIN}/confirm/${shortId}`;
  const html = `
  <div style="text-align: left;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <p>Dear course participants,</p>

    <p><span style="text-transform: capitalize">${name}</span> has invited you to register for an upcoming Connect 5 training session.</p>
    <ul style="text-transfrom: capitalize">
      <li>Session Date: ${sessionDate}</li>
      <li>Session Type: ${type}</li>
      <li>Address: ${fullAddress}</li>
      <li>Region: ${region}</li>
      <li>Time: ${startTime} to ${endTime}</li>
      <li>Trainers: ${trainerName}</li>
    </ul>
    <div style="text-align: center;">
    <p>To confirm your attendance please click this link here</p>
      <a href="${registrationURL}" style="display: inline-block; padding: 0.5rem 1rem; background: #787BB9; color: white; font-size: 16px; font-weight: 900; border-radius: 10px; box-shadow: 0px 5px 11px 1px #9e9e9e7d; text-decoration: none;">confirm our registration</a>
    </div>

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
    bcc: emailsList,
    subject,
    html,
    user,
    pass,
    attachments,
  });
};

module.exports = sendEmailInvitation;
