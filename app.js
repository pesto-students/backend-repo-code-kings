const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const routineRouter = require("./routes/routineRoutes");
const globalErrorController = require("./controllers/errorController");
// ADD LIMITER
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api/", limiter);
// HELMET
app.use(helmet());
// BODY PARSER
app.use(express.json());
// MONGO SANITIZE
app.use(mongoSanitize());
// SANITISATON AGAINS NOSQL INJECTION AND XSS
app.use(xss());
// PARAMETER POLUTION
app.use(hpp());
// DEFINED ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/routines", routineRouter);
// UNDEFINED ROUTES HANDLER
app.all("*", (req, res, next) => {
  next(new AppError(`This route is not available ${req.originalUrl}!`, 404));
});
// GLOBAL ERROR CONTROLLER
app.use(globalErrorController);
module.exports = app;
