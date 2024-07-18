const mongoose = require("mongoose");
var validator = require("validator");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "A user must have an email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "A user must have a password"],
    minLength: 8,
  },
});

const User = new mongoose.model("Users", UserSchema);

module.exports = User;
