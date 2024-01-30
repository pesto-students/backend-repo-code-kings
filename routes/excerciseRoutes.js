const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/authController");
const excerciseController = require("../controllers/excerciseController");
const factory = require("../controllers/handlerFactory");
router
  .route("/")
  .post(
    authController.protect,
    excerciseController.setExcerciseRoutineIds,
    authController.restrictTo("user"),
    excerciseController.createExcercise
  );
router
  .route("/:id")
  .patch(
    authController.protect,
    factory.authorize,
    excerciseController.updateExcercise
  )
  .get(
    authController.protect,
    factory.authorize,
    excerciseController.getExcercise
  )
  .delete(
    authController.protect,
    factory.authorize,
    excerciseController.deleteExcercise
  );

module.exports = router;
