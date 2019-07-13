const fs = require('fs');
const path = require('path');
const boom = require('boom');
const moment = require('moment');
const createCertificate = require('../../helpers/generatePdf');
const { getUserNameById } = require('../../database/queries/user');
const sendCertificate = require('../../helpers/emails/sendCertificate');
const {
  getSessionById,
} = require('../../database/queries/sessionDetails/session');

const generateCertificate = async (req, res, next) => {
  try {
    const { name, email, sendEmail } = req.body;
    const { sessionId } = req.params;

    // get session data
    const session = await getSessionById(sessionId);

    const { type: sessionType, date, trainers } = session;
    if (!name || !sessionType || !sessionType || !trainers) {
      return next(boom.badData());
    }

    const formatedDate = moment(date).format('YYYY-MM-DD');

    const sessionTypeEdit =
      sessionType && sessionType.includes('train')
        ? sessionType
        : `session${sessionType}`;

    const promises = trainers.map(trainerId => getUserNameById(trainerId));
    const resp = await Promise.all(promises);
    const trainersNames = resp
      .map(trainer => {
        return `${trainer.name[0].toUpperCase()}${trainer.name.slice(1)}`;
      })
      .join(' & ');

    const fileName = createCertificate(
      sessionTypeEdit,
      name,
      formatedDate,
      trainersNames
    );

    if (sendEmail) {
      // send email
      await sendCertificate({ email, fileName });
    }

    res.sendFile(
      path.join(__dirname, '..', '..', 'tempCertificate', fileName),
      err => {
        if (err) {
          next(boom.badImplementation());
        } else {
          fs.unlink(
            path.join(__dirname, '..', '..', 'tempCertificate', fileName),
            deleteErr => {
              if (deleteErr) {
                console.error(deleteErr);
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log('err', err);
    next(boom.badImplementation());
  }
};

module.exports = generateCertificate;
