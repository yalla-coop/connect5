const nodemailer = require('nodemailer');

module.exports = ({
  from,
  to,
  subject,
  html,
  user,
  pass,
  attachments,
  bcc,
}) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.googlemail.com', // Gmail Host
    secure: true,
    port: 465, // this is true as port is 465
    auth: {
      user,
      pass,
    },
  });

  // should on of 'to' or 'bcc' be proviced at lest
  if (!to && !bcc) {
    return Promise.reject(new Error('no recipients'));
  }

  // send mail with defined transport object
  return transporter.sendMail({
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
    attachments,
    bcc, // bcc receivers
  });
};
