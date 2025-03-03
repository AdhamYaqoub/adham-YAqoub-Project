const express = require("express");
const cors = require("cors");
const app = express();

// settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("website"));

let projectData = {};

// GET Route
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST Route
app.post("/add", (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData = { temperature, date, userResponse };
  res.send({ success: true });
});

// Run the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
