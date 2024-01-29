const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/authController");
const routineController = require("../controllers/routineController");
const excerciseRouter = require("../routes/excerciseRoutes");
router
  .route("/")
  .get(authController.protect, routineController.getAllRoutines)
  .delete(authController.protect, routineController.deleteAllRoutines)
  .post(authController.protect, routineController.createRoutine);

router.use("/:routineId/excercises", excerciseRouter);

module.exports = router;
