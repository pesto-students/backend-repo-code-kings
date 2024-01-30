const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const routineController = require("../controllers/routineController");
const factory = require("../controllers/handlerFactory");
router.use(authController.protect);
router.use(factory.authorize);
router
  .route("/")
  .get(routineController.getUserRoutines)
  .post(
    authController.restrictTo("user"),
    routineController.setUserId,
    routineController.createRoutine
  );
router
  .route("/:id")
  .get(routineController.getUserRoutine)
  .delete(routineController.deleteRoutine)
  .patch(routineController.udpateRoutine);

module.exports = router;
