const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const DB = process.env.MONGODB_URL.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);
console.log(DB);
const connectDB = () => {
  mongoose.connect(DB).then(() => {
    console.log("Connection successfull to database");
  });
};

module.exports = connectDB;
