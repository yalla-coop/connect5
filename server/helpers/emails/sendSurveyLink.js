const moment = require('moment');

const mailer = require('./index');

const sendSurveyLink = ({
  recipients,
  sessionDate,
  sessionType,
  trainers,
  address,
  startTime,
  endTime,
  shortId,
  preSurveyLink,
  postSurveyLink,
  extraInformation,
}) => {
  let extraParagraph;
  let fullAddress = '';
  if (address) {
    const { postcode, addressLine1, addressLine2 } = address;
    if (postcode || addressLine1 || addressLine2) {
      fullAddress = [addressLine1, addressLine2, postcode]
        .filter(item => !!item)
        .join(', ');
    }
  }

  if (preSurveyLink) {
    extraParagraph = `
    <div>
      <p>
        <b>Before starting the training session please follow this link and fill out the <a href="${preSurveyLink}">pre-survey</a>.</b>
      </p>
    </div>
    `;
  }

  const html = `
  <div style="text-align: left;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <p>Dear course participants,</p>

    <p>We're looking forward to welcome you at our upcoming Connect 5 training session:</p>
    <ul style={{listStyle: 'none'}}>
      <li> Session Date: ${(sessionDate &&
        moment(sessionDate).format('DD MMM YYYY')) ||
        'N/A'}</li>
      <li> Session Type: ${sessionType || 'N/A'}</li>
      <li> Location:  ${fullAddress || 'TBC'}</li>
      <li> time: ${startTime || '-'} to ${endTime || '-'}</li>
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

    ${preSurveyLink ? extraParagraph : ''}
    </br>

    <div>
      <p>
        <b>After the session please click this link and fill out the <a href="${postSurveyLink}">post-survey</a>.</b>
      </p>
    </div>

    ${extraInformation ? `<pre>${extraInformation}</pre>` : ''}

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

module.exports = sendSurveyLink;
