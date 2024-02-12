const catchAsync = require("../utils/catchAsync");
const Image = require("../models/imageModel");
const { uploadOnCloudinary } = require("../utils/cloudinary");

exports.setUserId = (req, res, next) => {
  if (!req.body.userId) req.body.userId = req.user.id;

  next();
};

exports.uploadFile = catchAsync(async (req, res, next) => {
  const avatarLocalPath = req.file.path;

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  await Image.create({
    userId: req.body.userId,
    image: avatar.url,
  });

  res.status(200).json({ message: "file uploaded" });
});

exports.getFile = catchAsync(async (req, res, next) => {
  try {
    const image = await Image.find({ userId: req.user.id });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "successful get data ", data: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
