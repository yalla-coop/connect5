const mailer = require('./index');

module.exports = to => {
  const domain = process.env.DOMAIN;
  const link = `${domain}/signup`;

  const html = `
  <div style="text-align: center;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
      <p style="font-weight: 700; text-transform: capitalize; font-size: 1.3rem">Hi there,</p>
      <p>We got a request to reset your connect5 account password.</p>
      <p>The email you have sent is not found, we are happy to join us, you can register for new account by clicking the link below.</p>

      <div style="text-align: center;">
        <a href="${link}" style="display: inline-block; padding: 0.5rem 1rem; background: #787BB9; color: white; font-size: 16px; font-weight: 900; border-radius: 10px; box-shadow: 0px 5px 11px 1px #9e9e9e7d; text-decoration: none;">Join Us Now</a>
      </div>
      <p style="margin-bottom: 0;">Thanks,</p>
      <p style="margin-bottom: 0;">connect5 team</p>
    </div>
  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = 'Join Us';
  const from = process.env.EMAIL;

  const attachments = [
    {
      filename: 'logo.png',
      path: `${__dirname}/../../assets/connect-5-white.png`,
      cid: 'connect5-logo',
    },
  ];

  return mailer({
    from,
    to,
    subject,
    html,
    user,
    pass,
    attachments,
  });
};
