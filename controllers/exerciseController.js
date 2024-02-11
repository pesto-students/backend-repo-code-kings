const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Exercise = require("../models/exerciseModel");
const factory = require("./handlerFactory");
exports.setExerciseRoutineIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.routine) req.body.routine = req.params.routineId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createExercise = factory.createOne(Exercise);
exports.updateExercise = factory.updateOne(Exercise);
exports.getExercise = factory.getOne(Exercise);
exports.deleteExercise = factory.deleteOne(Exercise);
