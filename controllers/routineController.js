const factory = require("./handlerFactory");
const Routine = require("../models/routineModel");
exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getUserRoutines = factory.getAll(Routine, "exercises");
exports.getUserRoutine = factory.getOne(Routine, "exercises");
exports.createRoutine = factory.createOne(Routine);
exports.deleteRoutine = factory.deleteOne(Routine);
exports.updateRoutine = factory.updateOne(Routine);
