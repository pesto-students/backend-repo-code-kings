const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
// const routineRouter = require("../routes/routineRoutes");
// AUTH ROUTES
router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);
router
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updatePassword);
// USER ROUTES
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );
router.patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", authController.protect, userController.deleteMe);
// USER ROUTINES ROUTES
router
  .route("/routines")
  .get(authController.protect, userController.getUserRoutines)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    userController.setUserId,
    userController.createRoutine
  );
router
  .route("/routines/:id")
  .get(authController.protect, userController.getUserRoutine)
  .delete(authController.protect, userController.deleteRoutine)
  .patch(authController.protect, userController.udpateRoutine);
// USER SPECIFIC ROUTINE ROUTES
// router.use("/:userId/routines", routineRouter);
module.exports = router;
