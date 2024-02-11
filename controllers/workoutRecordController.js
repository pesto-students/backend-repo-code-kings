const factory = require("./handlerFactory");
const WorkoutRecord = require("../models/workoutRecordModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Routine = require("../models/routineModel");
exports.setUserIdAndName = (req, res, next) => {
  if (!req.body.userId) req.body.userId = req.user.id;
  if (!req.body.userName) req.body.userName = req.user.name;
  next();
};

exports.getUserWorkoutRecords = catchAsync(async (req, res, next) => {
  const records = await WorkoutRecord.find({ userId: req.user.id });

  res.status(200).json({
    status: "success",
    results: records.length,
    data: {
      data: records,
    },
  });
});

exports.getUserWorkoutRecord = catchAsync(async (req, res, next) => {
  let query = WorkoutRecord.findOne({ _id: req.params.id });

  query = query.populate("routine");

  let doc = await query;

  let routine = await Routine.findOne({ _id: doc.routineId }).populate(
    "exercises"
  );

  doc.exercises = routine.exercises;

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createWorkoutRecord = factory.createOne(WorkoutRecord);

exports.deleteWorkoutRecord = catchAsync(async (req, res, next) => {
  const doc = await WorkoutRecord.deleteOne({ _id: req.params.id });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateWorkoutRecord = catchAsync(async (req, res, next) => {
  const doc = await WorkoutRecord.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
