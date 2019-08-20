const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirmation: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // Works on .save() and .create() only
      validator: function (element) {
        return element === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  passwordChangedTimestamp: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  // Only run function if password was modified
  if (!this.isModified('password')) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password confirmation field
  this.passwordConfirmation = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePassword = function (JWTTimestamp) {
  if (this.passwordChangedTimestamp) {
    const changedTimestamp = parseInt(this.passwordChangedTimestamp.getTime() / 1000, 10);
    console.log (changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
