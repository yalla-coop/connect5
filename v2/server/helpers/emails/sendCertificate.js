const path = require('path');
const mailer = require('./index');

const sendCertificate = ({ email: participantsList, fileName: pdfName }) => {
  // convert the session type into capitalizesd words

  const html = `
  <div style="text-align: center;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin-left: auto"/>
    </div>
    <div style="text-align: left;">
      <p style="font-weight: 700;">Hi,</p>

      <p style="font-weight: 700;">Congratulations!, This is your certificate pdf file</p>
     
      <p style="margin-bottom: 0;">Thanks,</p>
      <p style="margin-bottom: 0;">Connect 5</p>
    </div>  
  </div>  
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = `Connect 5: your session completion certificate`;
  const from = 'Connect 5';

  const attachments = [
    {
      filename: 'logo.png',
      path: `${__dirname}/../../assets/connect-5-white.png`,
      cid: 'connect5-logo',
    },
    {
      filename: pdfName,
      path: path.join(__dirname, '..', '..', 'tempCertificate', pdfName),
      cid: 'certificate-pdf',
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

module.exports = sendCertificate;
