const express = require("express");
const app = express();
const AppError = require("./utils/appError");
app.use(express.json());

app.all("*", (req, res, next) => {
  next(new AppError(`This route is not available ${req.originalUrl}!`, 404));
});
module.exports = app;
