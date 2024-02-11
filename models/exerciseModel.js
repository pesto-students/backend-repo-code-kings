const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A exercise must have a name!"],
  },
  sets: {
    type: Number,
    default: 0,
  },
  reps: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  routine: {
    type: mongoose.Schema.ObjectId,
    ref: "Routine",
    required: [true, "An exercise must belong to a routine!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "An exercise must belong to a user!"],
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
