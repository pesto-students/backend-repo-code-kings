const mongoose = require("mongoose");

const workoutRecordSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      ref: "User",
      required: [true, "A workout record must belong to a user!"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A workout record  must belong to a user!"],
    },
    exercises: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Exercise",
      },
    ],
    routineId: {
      type: mongoose.Schema.ObjectId,
      ref: "Routine",
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

workoutRecordSchema.virtual("routine", {
  ref: "Routine",
  localField: "routineId",
  foreignField: "_id",
  justOne: true,
  populate: {
    path: "exercises",
    model: "Exercise",
  },
});

const WorkoutRecord = mongoose.model("WorkoutRecord", workoutRecordSchema);

module.exports = WorkoutRecord;
