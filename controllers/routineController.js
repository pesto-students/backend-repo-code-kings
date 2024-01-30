const Routine = require("../models/routineModel");
const catchAsync = require("../utils/catchAsync");

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllRoutines = catchAsync(async (req, res, next) => {
  const routines = await Routine.find();
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
