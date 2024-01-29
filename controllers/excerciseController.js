const catchAsync = require("../utils/catchAsync");
const Excercise = require("../models/excerciseModel");

exports.createExcercise = catchAsync(async (req, res, next) => {
  if (!req.body.routine) req.body.routine = req.params.routineId;
  const excercise = await Excercise.create(req.body);
  console.log(excercise);
  res.status(201).json({
    status: "success",
    data: {
      excercise,
    },
  });
});

exports.getAllExcercises = catchAsync(async (req, res, next) => {});
