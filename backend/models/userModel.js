const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have an email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "A user must have a password"],
    minLength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must confirm their password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    //hashing the password to secure
    this.passwordConfirm = undefined;
  }
  next();
});

UserSchema.methods.comparePasswords = async function (
  userPassword,
  hashedPassword
) {
  console.log(userPassword, hashedPassword);
  return await bcrypt.compare(userPassword, hashedPassword);
};

const User = new mongoose.model("Users", UserSchema);

module.exports = User;
