const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/authController");
const excerciseController = require("../controllers/excerciseController");
router
  .route("/")
  .get(excerciseController.getAllExcercises)
  .post(authController.protect, excerciseController.createExcercise);

module.exports = router;
