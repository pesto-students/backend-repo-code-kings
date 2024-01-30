const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
// AUTH ROUTES
router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);
router.use(authController.protect);
router.route("/updateMyPassword").patch(authController.updatePassword);
// USER ROUTES
router
  .route("/")
  .get(authController.restrictTo("admin"), userController.getAllUsers);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

module.exports = router;
