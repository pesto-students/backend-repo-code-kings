const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(excerciseController.getAllExcercises)
  .post(excerciseController.createExcercise);
