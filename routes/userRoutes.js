const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// AUTH ROUTES
router.route("/signup").post(authController.signUp);

module.exports = router;
