const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const routineRouter = require("./routes/routineRoutes");
const excerciseRouter = require("./routes/excerciseRoutes");

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/routines", routineRouter);
app.use("/api/v1/excercises", excerciseRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`This route is not available ${req.originalUrl}!`, 404));
});

module.exports = app;
