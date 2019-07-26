const mailer = require('./index');

module.exports = (to, token, name) => {
  const domain = process.env.DOMAIN;
  const link = `${domain}/reset-password/${token}`;

  const html = `
  <div style="text-align: center;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
      <p style="font-weight: 700; text-transform: capitalize; font-size: 1.3rem">Hi ${name}</p>
      <p>We got a request to reset your connect5 account password.</p>
      <p>To reset your password, click the link below or paste the following URL into your
      browser. If you did not ask to reset your password, please let us know and ignore this
      email.</p>

      <div style="text-align: center;">
        <a href="${link}" style="display: inline-block; padding: 0.5rem 1rem; background: #787BB9; color: white; font-size: 16px; font-weight: 900; border-radius: 10px; box-shadow: 0px 5px 11px 1px #9e9e9e7d; text-decoration: none;">Reset your password</a>
      </div>
      <p style="font-weight: 700;">${link}</p>
      <p style="margin-bottom: 0;">Thanks,</p>
      <p style="margin-bottom: 0;">connect5 team</p>
    </div>
  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = 'Reset Your Password';
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
