const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date
    },
    avatar: {
      type: String
    },
    bio: {
      type: String
    },
    thanks: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
