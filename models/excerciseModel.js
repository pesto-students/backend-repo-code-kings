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
  routine: {
    type: mongoose.Schema.ObjectId,
    ref: "Routine",
    required: [true, "An excercise must belong to a routine!"],
  },
});

const Excercise = mongoose.model("Excercise", excerciseSchema);

module.exports = Excercise;
