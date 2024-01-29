const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    message: "user created successfully",
    data: {
      newUser,
    },
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and passsword!", 400));
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new AppError("No user found with this email!", 404));
  }
  if (!user || !user.checkPasswordCorrect(password, user.password)) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Please login", 403));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return next(new AppError("This is not a valid token!", 403));
  }
  const id = decoded?.id;
  console.log(decoded);
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("User for this token no longer exists", 404));
  }
  if (user.checkPasswordChangedBefore(decoded.iat)) {
    return next(
      new AppError(
        "The user has changed password since the token has issued!",
        403
      )
    );
  }
  req.user = user;
  console.log(user, "KAKAK");
  next();
});
