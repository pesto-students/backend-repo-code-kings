const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Example route to create a new user
router.post("/users", userController.createUser);

module.exports = router;
