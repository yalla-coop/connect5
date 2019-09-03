const mailer = require('./index');

const sendReminder = ({
  recipients,
  sessionDate,
  sessionType,
  trainers,
  address,
  startTime,
  endTime,
  shortId,
  preServeyLink,
}) => {
  let extraParagraph;

  if (preServeyLink) {
    extraParagraph = `
    <div>
      <p>
        <b>Before starting the training session please follow this link and fill out the <a href="${preServeyLink}">pre-survey</a>.</b>
      </p>
      <div style="text-align: center;">
        <a href="${preServeyLink}" style="display: inline-block; padding: 0.5rem 1rem; background-color: #2C3192; color: white; font-size: 20px; font-weight: 900; border-radius: 10px; box-shadow: 0px 5px 11px 1px #9e9e9e7d; text-decoration: none;">Fill the survey</a>
      </div>
    </div>
    `;
  }

  const html = `
  <div style="text-align: left;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <p>Dear course participants,</p>

    <p>This is a friendly reminder related to the following Connect 5 training session:</p>
    <ul style={{listStyle: 'none'}}>
      <li> Session Date: ${sessionDate || 'N/A'}</li>
      <li> Session Type: ${sessionType || 'N/A'}</li>
      <li> Location: ${address || 'N/A'}</li>
      <li> time: ${startTime || 'N/A'} to ${endTime || 'N/A'}</li>
      <li> trainers: ${trainers || 'N/A'}</li>
    </ul>
    <p>
      To track your own progress and to ensure that our
      trainings are effective we rely on course
      participants to fill out surveys after each session.
      All the data is anonymised. After answering surveys
      you can immediately see your own progress and access
      certificates via the app. You will receive a link to the post-session survey  from your trainers.
    </p>

    ${preServeyLink ? extraParagraph : ''}
    </br>
    <p>Sincerely,</p>

    <p>your Connect 5 team.</p>
  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = 'Session Reminder';
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
    bcc: recipients,
    subject,
    html,
    user,
    pass,
    attachments,
  });
};

module.exports = sendReminder;
