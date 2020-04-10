const mongoose = require("mongoose");

// User registration model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  repeat_password: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
