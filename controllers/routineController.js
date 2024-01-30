const factory = require("./handlerFactory");
const Routine = require("../models/routineModel");
exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getUserRoutines = factory.getAll(Routine);
exports.getUserRoutine = factory.getOne(Routine, "excercises");
exports.createRoutine = factory.createOne(Routine);
exports.deleteRoutine = factory.deleteOne(Routine);
exports.udpateRoutine = factory.updateOne(Routine);
