const mongoose = require("mongoose");

const excerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A excercise must have a name!"],
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
    required: [true, "An excercise must belong to a routine!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "An excercise must belong to a user!"],
  },
});

const Excercise = mongoose.model("Excercise", excerciseSchema);

module.exports = Excercise;
