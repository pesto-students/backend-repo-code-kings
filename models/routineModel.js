const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A routine must have a name!"],
    maxlength: [50, "A tour cannot have a name of more than 50 characters!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A routine must belong to a user!"],
  },
});

// routineSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "user",
//     select: "name email",
//   });
//   next();
// });

const Routine = mongoose.model("Routine", routineSchema);

module.exports = Routine;
