// Show this
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const interviewRoutes = require("./routes/interviewRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// show this
app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend is working",
  });
});

// Interview routes
// show this
app.use("/api/interview", interviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
