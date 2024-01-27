const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requires: [true, "A user must have a name"],
    },
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "Not a valid email"],
      required: [true, "A user must have an email"],
    },
    password: {
      type: String,
      required: [true, "A password is required"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "Enter same function as password!",
      },
    },
    passwordChangedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual populate of routines on user
userSchema.virtual("routines", {
  ref: "Routine",
  foreignField: "user",
  localField: "_id",
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.passwordChangedAt = Date.now();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.methods.checkPasswordCorrect = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.checkPasswordChangedBefore = function (iat) {
  const changedTimestamp = parseInt(
    this.passwordChangedAt.getTime() / 1000,
    10
  );
  return iat < changedTimestamp;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
