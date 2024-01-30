const express = require("express");
const router = express.Router({ mergeParams: true });
const routineController = require("../controllers/routineController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    routineController.getAllRoutines
  );

module.exports = router;
