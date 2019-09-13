const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { regions } = require('./../DBConstants');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: {
      value: 'String',
      expiresIn: Date,
    },
    //  the trainer's local lead
    localLead: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },

    // group of trainers that user is co-ordinating
    // list of trainers ID
    trainersGroup: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    region: {
      type: String,
      enum: regions.map(region => region.toLocaleLowerCase()),
      lowercase: true,
    },
    role: {
      type: String,
      enum: ['admin', 'localLead', 'trainer'],
      required: true,
    },
    // true  -> official Local Lead
    // false -> manager
    officialLocalLead: {
      type: Boolean,
      default: false,
    },
    // name - to be showed in the dashboard
    name: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    // list of managers/local leads, that added this trainer to their groups
    managers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function hashPasswrod() {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    try {
      const hashedPassword = await bcrypt.hash(document.password, 8);
      document.password = hashedPassword;
    } catch (err) {
      throw new Error('Something bad happend');
    }
  } else {
    throw new Error('Invalid data');
  }
});

// check password method
userSchema.methods.isCorrectPassword = function isCorrectPassword(password) {
  return bcrypt.compare(password, this.password);
};

const User = model('users', userSchema);

module.exports = User;
