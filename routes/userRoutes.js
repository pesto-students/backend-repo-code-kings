const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// AUTH ROUTES
router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);
router.get("/logout", authController.logout);
router.route("/forgotPassword").post(authController.forgotPassword);
router.use(authController.protect);
router.route("/updateMyPassword").patch(authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);

// USER ROUTES

router.patch("/updateMe", upload.single("file"), userController.updateMe);
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
