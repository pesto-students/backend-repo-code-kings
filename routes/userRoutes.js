const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const routineController = require("../controllers/routineController");

router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);

router.route("/:id").get(authController.protect, userController.getUser);

router
  .route("/:id/routines")
  .post(authController.protect, routineController.createRoutine);

module.exports = router;
