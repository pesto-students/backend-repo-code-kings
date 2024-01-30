const Routine = require("../models/routineModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllRoutines = factory.getAll(Routine);
