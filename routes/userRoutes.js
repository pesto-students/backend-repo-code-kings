const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
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
module.exports = router;
