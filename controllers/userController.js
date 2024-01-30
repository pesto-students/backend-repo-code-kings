const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Routine = require("../models/routineModel");

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().populate("routines");
  res.status(200).json({
    status: 200,
    data: {
      users,
    },
  });
});

exports.getUserRoutines = catchAsync(async (req, res, next) => {
  const routines = await Routine.find({ user: req.user.id });
  res.status(200).json({
    status: "success",
    data: {
      routines,
    },
  });
});

exports.createRoutine = catchAsync(async (req, res, next) => {
  const newRoutine = await Routine.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newRoutine,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, "name", "email");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
