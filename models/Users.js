const mongoose = require("mongoose");

const UserSchema = new.mongoose.Schema({
  name: {
    type: String,
    required: True,
  },
  email: {
    type: String,
    required: True,
  },
  phone: {
    type: Number,
    required: True,
  },
  age: {
    type: Number,
    required: True,
  },
  dob: {
    type: Date,
    required: True,
  },
  password: {
    type: String,
    required: True,
  },
  password2: {
    type: String,
    required: True,
  },
  name: {
    type: String,
    required: True,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
