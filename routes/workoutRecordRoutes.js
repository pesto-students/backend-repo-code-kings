const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const workoutRecordController = require("../controllers/workoutRecordController");
const factory = require("../controllers/handlerFactory");
router.use(authController.protect);
router.use(factory.authorize);
router
  .route("/")
  .get(workoutRecordController.getUserWorkoutRecords)
  .post(
    authController.restrictTo("user"),
    workoutRecordController.setUserIdAndName,
    workoutRecordController.createWorkoutRecord
  );
router
  .route("/:id")
  .get(workoutRecordController.getUserWorkoutRecord)
  .delete(workoutRecordController.deleteWorkoutRecord)
  .patch(workoutRecordController.updateWorkoutRecord);

module.exports = router;
