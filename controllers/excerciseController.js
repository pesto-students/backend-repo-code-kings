const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Excercise = require("../models/excerciseModel");
const factory = require("../controllers/handlerFactory");
exports.setExcerciseRoutineIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.routine) req.body.routine = req.params.routineId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createExcercise = factory.createOne(Excercise);
exports.updateExcercise = factory.updateOne(Excercise);
exports.getExcercise = factory.getOne(Excercise);
exports.deleteExcercise = factory.deleteOne(Excercise);
