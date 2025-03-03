const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 8081;

app.post("/api/analyze", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided." });
  }

  const response = {
    polarity: "positive",
    subjectivity: "subjective",
    text: text,
  };
  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
