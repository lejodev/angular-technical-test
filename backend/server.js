const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
const port = 3000;

// Sample data (you can replace this with your AI functionality)
let data = [
  { id: 1, name: "Example 1" },
  { id: 2, name: "Example 2" },
];

app.use(bodyParser.json());

// GET all data
app.get("/data", (req, res) => {
  res.json(data);
});

// GET data by ID
app.get("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

// POST new data
app.post("/data", (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT/update data by ID
app.put("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = data.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    data[itemIndex] = req.body;
    res.json(data[itemIndex]);
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

// DELETE data by ID
app.delete("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = data.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    data.splice(itemIndex, 1);
    res.json({ message: "Data deleted" });
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
