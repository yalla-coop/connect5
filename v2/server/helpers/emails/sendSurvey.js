const mailer = require('./index');

const sendSurvey = ({ surveyURLs, participantsList }) => {
  // convert the session type into capitalizesd words
  const uppercaseSurvey = surveyType =>
    surveyType
      .split('-')
      .map(item => item[0].toLocaleUpperCase() + item.slice(1))
      .join(' ');

  const html = `
  <div style="text-align: center;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin-left: auto"/>
    </div>
    <div style="text-align: left;">
      <p style="font-weight: 700;">Hi,</p>
      ${surveyURLs.map(survey => {
        return `<p>Here is the link for the "${uppercaseSurvey(
          survey.surveyType
        )}" survey</p>
        <p>Click the below link to fill, please</p>
        
        <div style="text-align: center;">
          <a href="${
            survey.surveyURL
          }" style="display: inline-block; padding: 0.5rem 1rem; background-color: #2C3192; color: white; font-size: 20px; font-weight: 900; border-radius: 10px; box-shadow: 0px 5px 11px 1px #9e9e9e7d; text-decoration: none;">Fill the survey</a>
        </div>
        <p>or copy the link below into your browser to fill the survey</p>
        <p style="font-weight: 700;">${survey.surveyURL}</p>`;
      })}

      <p style="margin-bottom: 0;">Thanks,</p>
      <p style="margin-bottom: 0;">Connect 5</p>
    </div>  
  </div>  
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = `Connect 5 suverys links`;
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
    to: participantsList,
    subject,
    html,
    user,
    pass,
    attachments,
  });
};

module.exports = sendSurvey;
