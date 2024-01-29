const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// USER SCHEMA
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is required!"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Plese enter a valid email!"],
    unique: true,
    required: [true, "An email is required!"],
  },
  password: {
    type: String,
    minLength: [8, "A password must have atleas 8 characters!"],
    required: [true, "A password is required!"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "A password confirm is required!"],
    validate: function (el) {
      return this.password === el;
    },
    message: "Enter same function as password!",
  },
  passwordChangedAt: Date,
});

// DOCUMENT MIDDLEWARE
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.passwordChangedAt = Date.now();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});
// INSTANCE METHODS
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// CREATING USER MODEL
const User = mongoose.model("User", userSchema);

module.exports = User;
