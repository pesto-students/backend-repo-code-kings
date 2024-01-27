const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const routineController = require("../controllers/routineController");

router
  .route("/")
  .get(authController.protect, routineController.getAllRoutines)
  .delete(authController.protect, routineController.deleteAllRoutines);

module.exports = router;
