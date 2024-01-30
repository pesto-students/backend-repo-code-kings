const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// USER SCHEMA
const userSchema = new mongoose.Schema(
  {
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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordChangedAt: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// VIRTUAL POPULATE ROUTINES
userSchema.virtual("routines", {
  ref: "Routine",
  localField: "_id",
  foreignField: "user",
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
userSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

// INSTANCE METHODS
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// CREATING USER MODEL
const User = mongoose.model("User", userSchema);

module.exports = User;
