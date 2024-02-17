const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// CONFIG ENVS PATH
dotenv.config({ path: "./config.env" });
// CONNECT TO DB
const DB = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("Database connected successfully!");
});
// SERVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}!`);
});
