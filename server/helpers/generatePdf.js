const hummus = require('hummus');
const path = require('path');

const { fillForm } = require('./pdf-form-fill.js');

const createCertificate = (
  sessionType,
  participentName,
  sessionDate,
  trainers
) => {
  const fileName = `${sessionType}-${Date.now()}.pdf`;
  const writer = hummus.createWriterToModify(
    path.join(__dirname, '..', 'assets', `${sessionType}.pdf`),
    {
      modifiedFilePath: path.join(__dirname, '..', 'tempCertificate', fileName),
      userPassword: '',
      ownerPassword: 'owner1',
      userProtectionFlag: 4,
    }
  );

  const data = {
    name: participentName,
    date: sessionDate,
    trainers,
  };

  fillForm(writer, data, {
    defaultTextOptions: {
      font: writer.getFontForFile(
        path.join(__dirname, '..', 'assets', `courierb.ttf`)
      ),
      size: 16,
      colorspace: 'gray',
      color: 0,
    },
  });
  writer.end();
  return fileName;
};

module.exports = createCertificate;
