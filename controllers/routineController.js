const Routine = require("../models/routineModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllRoutines = catchAsync(async (req, res, next) => {
  const routines = await Routine.find();
  res.status(200).json({
    status: "success",
    data: {
      routines,
    },
  });
});
