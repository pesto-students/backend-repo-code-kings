const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`This route is not available ${req.originalUrl}!`, 404));
});

module.exports = app;
