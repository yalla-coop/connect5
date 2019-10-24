const boom = require('boom');
const crypto = require('crypto');
const { resetTokenMaxAge } = require('./../../constants');
const {
  getUserByEmail,
  updateUserById,
} = require('./../../database/queries/users');
const resetPasswordMailing = require('../../helpers/emails/resetPasswordByEmail');
const sendSignUpLinkByEmail = require('../../helpers/emails/sendSignUpLinkByEmail');

module.exports = async (req, res, next) => {
  const { email } = req.query;
  try {
    const buffer = crypto.randomBytes(32);

    const token = buffer.toString('hex');
    const user = await getUserByEmail(email);
    if (!user) {
      if (process.env.NODE_ENV === 'production') {
        await sendSignUpLinkByEmail(email);
      }
      return res.json({ success: true });
    }

    const { _id } = user;

    const data = {
      resetToken: {
        value: token,
        expiresIn: Date.now() + resetTokenMaxAge,
      },
    };
    await updateUserById(_id, data);
    // send the token via email

    if (process.env.NODE_ENV === 'production') {
      await resetPasswordMailing(email, token, user.name);
    }

    //  send success message
    res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
