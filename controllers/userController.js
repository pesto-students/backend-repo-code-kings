const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});
exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id).populate("routines");
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
