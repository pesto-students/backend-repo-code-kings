const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/authController");
const exerciseController = require("../controllers/exerciseController");
const factory = require("../controllers/handlerFactory");
router
  .route("/")
  .post(
    authController.protect,
    exerciseController.setExerciseRoutineIds,
    authController.restrictTo("user"),
    exerciseController.createExercise
  );
router
  .route("/:id")
  .patch(
    authController.protect,
    factory.authorize,
    exerciseController.updateExercise
  )
  .get(
    authController.protect,
    factory.authorize,
    exerciseController.getExercise
  )
  .delete(
    authController.protect,
    factory.authorize,
    exerciseController.deleteExercise
  );

module.exports = router;
