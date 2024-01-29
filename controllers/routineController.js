const catchAsync = require("../utils/catchAsync");
const Routine = require("../models/routineModel");
exports.getAllRoutines = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.id) {
    filter = { user: req.params.id };
  }
  const routines = await Routine.find(filter).populate("excercises");
  res.status(200).json({
    status: "success",
    data: {
      routines,
    },
  });
});

exports.createRoutine = catchAsync(async (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.params.id;
  }
  const newRoutine = await Routine.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newRoutine,
    },
  });
});

exports.deleteAllRoutines = catchAsync(async (req, res, next) => {
  await Routine.deleteMany();
  res.status(201).json({
    status: "success",
  });
});
