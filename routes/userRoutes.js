const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const routineRouter = require("../routes/routineRoutes");
router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);

router.route("/:id").get(authController.protect, userController.getUser);

router.use("/:id/routines", routineRouter);

module.exports = router;
