const express = require("express");
const router = express.Router();
const routineController = require("../controllers/routineController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    routineController.getAllRoutines
  )
  .post(
    authController.protect,
    authController.restrictTo("user"),
    routineController.setUserId,
    routineController.createRoutine
  );

module.exports = router;
