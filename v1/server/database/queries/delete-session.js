const Session = require("./../models/Session");

const deleteSession = id => new Promise((resolve, reject) => {
  Session.findByIdAndDelete(id)
    .then((result) => {
      resolve(result);
    })
    .catch(err => reject(err));
});


module.exports = deleteSession;
