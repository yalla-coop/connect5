const nodemailer = require('nodemailer');

module.exports = ({ from, to, subject, html, user, pass, attachments }) => {
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

  // send mail with defined transport object
  return transporter.sendMail({
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
    attachments,
  });
};
