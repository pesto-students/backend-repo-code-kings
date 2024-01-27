const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/authController");
const routineController = require("../controllers/routineController");

router
  .route("/")
  .get(routineController.getAllRoutines)
  .delete(authController.protect, routineController.deleteAllRoutines)
  .post(authController.protect, routineController.createRoutine);

module.exports = router;
