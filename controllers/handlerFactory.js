const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Middleware to check user role and modify query object accordingly
exports.authorize = (req, res, next) => {
  req.queryObj = req.user.role === "admin" ? {} : { user: req.user.id };
  next();
};

// Delete one document
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.deleteOne({ _id: req.params.id, ...req.queryObj });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

// Update one document
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndUpdate(
      { _id: req.params.id, ...req.queryObj },
      req.body,
      { new: true, runValidators: true }
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

// Create one document
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// Get one document
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findOne({ _id: req.params.id, ...req.queryObj });

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

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

// Get all documents
exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find(req.queryObj);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
