const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const globalErrorController = require("./controllers/errorController");
// BODY PARSER
app.use(express.json());
// DEFINED ROUTES
app.use("/api/v1/users", userRouter);
// UNDEFINED ROUTES HANDLER
app.all("*", (req, res, next) => {
  next(new AppError(`This route is not available ${req.originalUrl}!`, 404));
});
// GLOBAL ERROR CONTROLLER
app.use(globalErrorController);
module.exports = app;
