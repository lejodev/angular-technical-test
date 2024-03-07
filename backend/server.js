const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
const port = 3000;

// Sample customers (you can replace this with your AI functionality)
let customers = [
  {
    id: 1,
    name: "Example 1",
    date: "Tue Mar 05 2024 16:30:17 GMT-0500",
    products: 4,
  },
  {
    id: 1,
    name: "Example 1",
    date: "Tue Mar 05 2024 16:33:11 GMT-0500",
    products: 6,
  },
  {
    id: 1,
    name: "Example 1",
    date: "Wed Mar 06 2024 12:25:25 GMT-0500",
    products: 7,
  },
  {
    id: 1,
    name: "Example 1",
    date: "Thu Mar 07 2024 02:26:57 GMT-0500",
    products: 1,
  },
];

app.use(bodyParser.json());

// GET all customers
app.get("/customers", (req, res) => {
  res.json(customers);
});

// GET customers by ID
app.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = customers.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "customers not found" });
  }
});

// POST new customers
app.post("/customers", (req, res) => {
  const newItem = req.body;
  customers.push(newItem);
  res.status(201).json(newItem);
});

// PUT/update customers by ID
app.put("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = customers.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    customers[itemIndex] = req.body;
    res.json(customers[itemIndex]);
  } else {
    res.status(404).json({ message: "customers not found" });
  }
});

// DELETE customers by ID
app.delete("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = customers.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    customers.splice(itemIndex, 1);
    res.json({ message: "customers deleted" });
  } else {
    res.status(404).json({ message: "customers not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
