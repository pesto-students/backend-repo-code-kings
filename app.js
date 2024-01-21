const express = require("express");
const connectDB = require("./src/db/database");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Use Routes
// app.use("/api", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
