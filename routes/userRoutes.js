const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
// AUTH ROUTES
router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);
// USER ROUTES
router.route("/").get(userController.getAllUsers);
module.exports = router;
