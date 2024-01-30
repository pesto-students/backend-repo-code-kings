const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
// AUTH ROUTES
router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);
router.use(authController.protect);
router.route("/updateMyPassword").patch(authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);

// USER ROUTES

router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
