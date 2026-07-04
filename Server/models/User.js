const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
  },
  bio: {
    type: String,
    default: 'No bio available',
  },
  age: {
    type: Number,
    default: null,
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  phone: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  socialMediaLinks: {
    facebook: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
