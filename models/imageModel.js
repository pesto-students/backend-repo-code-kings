const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: {
    type: String, // cloudinary url
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
