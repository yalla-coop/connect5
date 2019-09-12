const mailer = require('./index');

const addNewTrainerToGroup = ({
  trainerName,
  trainerEmail,
  password,
  localLeadName,
  localLeadRegion,
  isNew,
  localLeadId,
  trainerId,
}) => {
  const loginLink = `${process.env.DOMAIN}/login`;
  const removeFromGroup = `${process.env.DOMAIN}/remove/${localLeadId}/${trainerId}`;
  const capLocalLeadName = `${localLeadName[0].toUpperCase()}${localLeadName.slice(
    1
  )}`;

  const html = `
  <div style="text-align: center;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <div style="text-align: left;">
      <p style="font-weight: 700;">Hi, <span style="font-weight: 900;  text-transform: capitalize;"> ${trainerName}</span></p>
      <p><span style="text-transform: capitalize">${capLocalLeadName}</span> (${localLeadRegion}): has added you to his/her group as a trainer</p>

      ${
        isNew
          ? `<p>You can now log in at ${loginLink} using the following credentials:</p>
        <p>account name: ${trainerEmail}</p>
        <p>password: ${password}</p>
        <p>Once logged in you can change your password.</p>`
          : ''
      }

      <p>Note: If you do not agree that <strong>${capLocalLeadName}</strong> can view your individual feedback data given by course participants please click the button underneath. If there appears to be an error please contact us directly.</p>

      <a href="${removeFromGroup}">I don't want my trainer manager/ local lead to view my feedback data</a>

      
      <p style="margin-bottom: 0;">Thanks,</p>
      <p style="margin-bottom: 0;">Connect 5</p>
    </div>
  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "You've been added to a localLead group";
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
    to: trainerEmail,
    subject,
    html,
    user,
    pass,
    attachments,
  });
};

module.exports = addNewTrainerToGroup;
