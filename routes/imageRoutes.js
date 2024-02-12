const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const imageController = require("../controllers/imageController");
const factory = require("../controllers/handlerFactory");

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

router.use(authController.protect);
router.use(factory.authorize);
router
  .post(
    "/upload",
    authController.restrictTo("user"),
    upload.single("file"),
    imageController.setUserId,
    imageController.uploadFile
  )
  .get("/", imageController.getFile);

module.exports = router;
